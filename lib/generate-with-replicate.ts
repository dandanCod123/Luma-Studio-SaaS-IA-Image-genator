import { replicate } from "@/lib/replicate";

type GenerateWithReplicateInput = {
  sourceImageUrl: string;
  prompt: string;
  model: string;
};

type GenerateWithReplicateOutput = {
  resultUrl: string;
};

function extractUrl(value: unknown): string | null {
  if (typeof value === "string" && value.startsWith("http")) {
    return value;
  }

  if (value instanceof URL) {
    return value.toString();
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "url" in value &&
    typeof (value as { url: unknown }).url === "string"
  ) {
    return (value as { url: string }).url;
  }

  if (
    typeof value === "object" &&
    value !== null &&
    typeof (value as { toString?: () => string }).toString === "function"
  ) {
    const stringValue = value.toString();
    if (stringValue.startsWith("http")) {
      return stringValue;
    }
  }

  return null;
}

export async function generateStyledImageWithReplicate({
  sourceImageUrl,
  prompt,
  model,
}: GenerateWithReplicateInput): Promise<GenerateWithReplicateOutput> {
  let output: unknown;

  if (!replicate) {
    throw new Error("Replicate client is not available.");
  }

  if (model === "black-forest-labs/flux-dev") {
    output = await replicate.run(model, {
      input: {
        prompt,
        image: sourceImageUrl,
        guidance: 3.5,
        num_outputs: 1,
        aspect_ratio: "1:1",
        output_format: "png",
        output_quality: 90,
        prompt_strength: 0.8,
      },
    });
  } else {
    throw new Error("Unsupported Replicate model.");
  }

  console.log("Replicate output:", output);

  if (Array.isArray(output) && output.length > 0) {
    const firstUrl = extractUrl(output[0]);
    if (firstUrl) {
      return { resultUrl: firstUrl };
    }
  }

  const directUrl = extractUrl(output);
  if (directUrl) {
    return { resultUrl: directUrl };
  }

  throw new Error("Replicate did not return a valid image URL.");
}
