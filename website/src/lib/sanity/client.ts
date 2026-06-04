import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, studioUrl } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  stega: {
    studioUrl,
  },
});

export function getPreviewClient() {
  const token = process.env.SANITY_API_READ_TOKEN;
  if (!token) return null;

  return client.withConfig({
    token,
    perspective: "previewDrafts",
    stega: {
      studioUrl,
    },
  });
}
