export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'au2uzesy'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export const apiVersion = '2024-01-01'

export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? 'http://localhost:3333'

/** Set to "staging" on the stage.simonask.io Vercel environment only. */
export const isStagingSite =
  process.env.NEXT_PUBLIC_SITE_ENV === 'staging'
