export const replicateImageModels = ["black-forest-labs/flux-dev"] as const;

export type ReplicateImageModel = (typeof replicateImageModels)[number];

export const replicateImageModelLabels: Record<ReplicateImageModel, string> = {
  "black-forest-labs/flux-dev": "FLUX Dev",
};
