function required(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(
      `Missing ${name}. Copy .env.example to .env.local and set your Sanity project ID.`,
    )
  }
  return value
}

export const projectId = required('NEXT_PUBLIC_SANITY_PROJECT_ID')

export const dataset = required('NEXT_PUBLIC_SANITY_DATASET')

export const apiVersion = '2024-01-01'

export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ?? 'http://localhost:3333'

/** Set to "staging" on the stage.simonask.io Vercel environment only. */
export const isStagingSite =
  process.env.NEXT_PUBLIC_SITE_ENV === 'staging'
