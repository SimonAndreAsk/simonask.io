import { draftMode } from "next/headers";

import { client, getPreviewClient } from "./client";
import { isStagingSite } from "./env";

export async function getSanityClient() {
  const { isEnabled } = await draftMode();
  const token = process.env.SANITY_API_READ_TOKEN;
  const usePreview = (isEnabled || isStagingSite) && Boolean(token);

  if (usePreview) {
    return getPreviewClient() ?? client;
  }

  return client;
}

type FetchOptions = {
  next?: { revalidate?: number | false };
  /** Disable stega for metadata, URLs, etc. Defaults to on in draft/preview. */
  stega?: boolean;
};

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  options?: FetchOptions,
): Promise<T> {
  const { isEnabled } = await draftMode();
  const token = process.env.SANITY_API_READ_TOKEN;
  const usePreview = (isEnabled || isStagingSite) && Boolean(token);
  const stegaEnabled = options?.stega ?? usePreview;

  let sanityClient = await getSanityClient();
  if (!stegaEnabled) {
    sanityClient = sanityClient.withConfig({ stega: false });
  }

  const { stega: _stega, ...fetchOptions } = options ?? {};
  return sanityClient.fetch<T>(query, params, fetchOptions);
}
