import {
  defaultStudioDataset,
  defaultStudioProjectId,
} from './studioEnv'

export const studioProjectId =
  process.env.SANITY_STUDIO_PROJECT_ID ?? defaultStudioProjectId

export const studioDataset =
  process.env.SANITY_STUDIO_DATASET ?? defaultStudioDataset
