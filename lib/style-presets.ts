export type StylePreset = {
  slug: string;
  label: string;
  description: string;
  thumbnailPath: string;
  thumbnailAlt: string;
  prompt: string;
};

export const stylePresets: StylePreset[] = [
  {
    slug: "storybook-3d",
    label: "Storybook 3D",
    description: "Soft cinematic lighting with polished 3D storybook detail.",
    thumbnailPath: "/storybook-example.png",
    thumbnailAlt: "Storybook 3D preset example",
    prompt:
      "Restyle the input image as a premium storybook-inspired 3D illustration. Preserve the same person, facial identity, hairstyle, pose, clothing shape, framing, and scene composition. Add soft depth, warm cinematic lighting, polished materials, and a refined animated-film look.",
  },
  {
    slug: "anime-cel",
    label: "Anime Cel",
    description: "Clean cel shading with expressive color and crisp outlines.",
    thumbnailPath: "/anime-cel-example.png",
    thumbnailAlt: "Anime cel preset example",
    prompt:
      "Restyle the input image as high-end anime cel art. Preserve the same person, facial identity, hairstyle, pose, outfit, framing, and background structure. Use clean linework, elegant cel shading, expressive color contrast, and polished studio-anime rendering.",
  },
  {
    slug: "clay-render",
    label: "Clay Render",
    description: "Handcrafted clay texture with sculpted forms and warm depth.",
    thumbnailPath: "/clay-render-example.png",
    thumbnailAlt: "Clay render preset example",
    prompt:
      "Restyle the input image as a handcrafted clay render. Preserve the same person, facial identity, pose, silhouette, framing, and important scene details. Use sculpted clay textures, rounded forms, subtle handmade imperfections, and warm premium lighting.",
  },
  {
    slug: "pixart",
    label: "Pixart",
    description:
      "Bright, expressive family-animation styling with polished 3D charm.",
    thumbnailPath: "/pixart-example.png",
    thumbnailAlt: "Pixart preset example",
    prompt:
      "Restyle the input image as a premium family-animation-inspired 3D character portrait. Preserve the same person, facial identity, expression, pose, clothing, framing, and scene layout. Use charming stylization, expressive features, warm lighting, and polished animated-film rendering.",
  },
  {
    slug: "voxel-block",
    label: "Voxel Block",
    description:
      "Chunky block-built styling with playful forms and pixel-crafted depth.",
    thumbnailPath: "/voxel-block-example.png",
    thumbnailAlt: "Voxel block preset example",
    prompt:
      "Restyle the input image as a premium voxel block-world illustration. Preserve the same person, pose, framing, outfit details, and major scene structure. Use cubic forms, pixel-crafted surfaces, simplified geometry, and bright game-like lighting.",
  },
  {
    slug: "marble-sculpture",
    label: "Marble Sculpture",
    description:
      "Elegant carved-stone portraiture with refined texture and museum lighting.",
    thumbnailPath: "/marble-sculpture-example.png",
    thumbnailAlt: "Marble sculpture preset example",
    prompt:
      "Restyle the input image as a refined marble sculpture portrait. Preserve the same person, facial identity, pose, framing, and major scene relationships. Translate the subject into carved stone with elegant chiseled detail, subtle surface veining, soft museum lighting, and a premium gallery finish.",
  },
];

export function getStylePreset(slug: string) {
  return stylePresets.find((preset) => preset.slug === slug);
}
