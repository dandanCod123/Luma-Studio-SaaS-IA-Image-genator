export const openAiImageModels = ["black-forest-labs/flux-dev"] as const;

export type OpenAiImageModel = (typeof openAiImageModels)[number];

export const openAiImageModelLabels: Record<OpenAiImageModel, string> = {
  "black-forest-labs/flux-dev": "FLUX Dev",
};
