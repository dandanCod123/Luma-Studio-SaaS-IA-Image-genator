import Replicate from "replicate";

const apiToken = process.env.REPLICATE_API_TOKEN;

export const replicate = apiToken
  ? new Replicate({
      auth: apiToken,
    })
  : null;
