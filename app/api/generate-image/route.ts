import {
  countGenerationsSince,
  createGeneration,
  utcMonthStart,
} from "@/db/generations";
import { getMonthlyGenerationLimit } from "@/lib/generation-quota";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import sharp from "sharp";

import * as Sentry from "@sentry/nextjs";
import { ACCEPTED_SOURCE_IMAGE_MIME_TYPES } from "@/lib/constants";
import { getStylePreset } from "@/lib/style-presets";
import { uploadBufferToImageKit } from "@/lib/imagekit";
import { generateStyledImageWithReplicate } from "@/lib/generate-with-replicate";
import { openAiImageModels } from "@/lib/openai-image-models";

export const runtime = "nodejs";

type EditImageSize = "1024x1024" | "1536x1024" | "1024x1536";

type GenerateImageRequest = {
  sourceImageUrl?: string;
  sourceMimeType?: string;
  originalFileName?: string;
  styleSlug?: string;
  model?: string;
};

async function inferImageSize(imageBuffer: Buffer): Promise<EditImageSize> {
  try {
    const metadata = await sharp(imageBuffer).metadata();

    if (!metadata.width || !metadata.height) {
      return "1024x1024";
    }

    const aspectRatio = metadata.width / metadata.height;

    if (aspectRatio > 1.08) return "1536x1024";
    if (aspectRatio < 0.92) return "1024x1536";
    return "1024x1024";
  } catch {
    return "1024x1024";
  }
}

function mapImageSizeToAspectRatio(size: EditImageSize) {
  switch (size) {
    case "1536x1024":
      return "3:2";
    case "1024x1536":
      return "2:3";
    default:
      return "1:1";
  }
}

export async function POST(request: Request) {
  const { userId, has } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const monthlyLimit = getMonthlyGenerationLimit(has);
  const usedThisMonth = await countGenerationsSince(userId, utcMonthStart());

  if (usedThisMonth >= monthlyLimit) {
    Sentry.logger.warn("generation.quota_exceeded", {
      limit: monthlyLimit,
      used: usedThisMonth,
    });

    return NextResponse.json(
      {
        error: `Monthly generation limit reached (${monthlyLimit} images). Upgrade your plan or try again next month.`,
        code: "QUOTA_EXCEEDED" as const,
        limit: monthlyLimit,
        used: usedThisMonth,
      },
      { status: 429 },
    );
  }

  const body = (await request.json()) as GenerateImageRequest;

  const { model, originalFileName, sourceImageUrl, sourceMimeType, styleSlug } =
    body;

  if (!sourceImageUrl) {
    return NextResponse.json(
      { error: "Please upload an image first." },
      { status: 400 },
    );
  }

  if (
    typeof sourceMimeType !== "string" ||
    !ACCEPTED_SOURCE_IMAGE_MIME_TYPES.has(sourceMimeType)
  ) {
    return NextResponse.json(
      { error: "Only JPG, PNG, and WEBP files are supported." },
      { status: 400 },
    );
  }

  if (typeof styleSlug !== "string") {
    return NextResponse.json(
      { error: "Please choose a style." },
      { status: 400 },
    );
  }

  if (
    typeof model !== "string" ||
    !openAiImageModels.includes(model as never)
  ) {
    return NextResponse.json(
      { error: "Please choose a valid model." },
      { status: 400 },
    );
  }

  const preset = getStylePreset(styleSlug);
  if (!preset) {
    return NextResponse.json(
      { error: "Unknown style preset." },
      { status: 400 },
    );
  }

  let imageBuffer: Buffer;

  try {
    const imageResponse = await fetch(sourceImageUrl);

    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: "Could not fetch the uploaded source image." },
        { status: 404 },
      );
    }

    imageBuffer = Buffer.from(await imageResponse.arrayBuffer());
  } catch {
    return NextResponse.json(
      { error: "Could not fetch the uploaded source image." },
      { status: 404 },
    );
  }

  const imageSize = await inferImageSize(imageBuffer);
  const aspectRatio = mapImageSizeToAspectRatio(imageSize);

  const prompt = [
    preset.prompt,
    "Preserve the person's identity, face structure, pose, composition, and overall framing.",
    "Do not add extra people, extra limbs, duplicate subjects, or change the camera angle.",
  ].join("\n\n");

  try {
    const generated = await Sentry.startSpan(
      {
        name: `image edit ${model}`,
        op: "gen_ai.request",
        attributes: {
          "gen_ai.request.model": model,
          "gen_ai.operation.name": "request",
          "gen_ai.request.messages": JSON.stringify([
            { role: "user", content: prompt },
            { role: "user", content: "[source image URL omitted]" },
          ]),
        },
      },
      async () => {
        return await generateStyledImageWithReplicate({
          sourceImageUrl,
          prompt: `${prompt}\n\nUse aspect ratio ${aspectRatio}.`,
          model,
        });
      },
    );

    const generatedResponse = await fetch(generated.resultUrl);

    if (!generatedResponse.ok) {
      return NextResponse.json(
        { error: "Could not download the generated image." },
        { status: 502 },
      );
    }

    const resultBuffer = Buffer.from(await generatedResponse.arrayBuffer());
    const imageBase64 = resultBuffer.toString("base64");

    const { url: resultImageUrl } = await uploadBufferToImageKit({
      buffer: resultBuffer,
      fileName: `${preset.slug}-result.png`,
      folder: `/users/${userId}/results`,
      mimeType: "image/png",
    });

    const savedGeneration = await createGeneration({
      clerkUserId: userId,
      originalFileName:
        typeof originalFileName === "string" ? originalFileName : null,
      sourceImageUrl,
      resultImageUrl,
      styleSlug: preset.slug,
      styleLabel: preset.label,
      model,
      promptUsed: prompt,
    });

    Sentry.logger.info("generation.completed", {
      generationId: savedGeneration.id,
      styleSlug: preset.slug,
      model,
    });

    return NextResponse.json({
      imageBase64,
      mimeType: "image/png",
      promptUsed: prompt,
      style: { slug: preset.slug, label: preset.label },
      model,
      savedGeneration,
    });
  } catch (error) {
    console.error("generate-image route failed", error);
    Sentry.captureException(error);

    return NextResponse.json(
      { error: "Image generation failed. Please try again." },
      { status: 500 },
    );
  }
}
