import {codeInput} from '@sanity/code-input'
import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'

import {studioDataset, studioProjectId} from './config/env'
import {defaultPreviewOrigin} from './config/studioEnv'
import {resolve} from './presentation/resolve'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

const previewOrigin =
  process.env.SANITY_STUDIO_PREVIEW_ORIGIN ??
  (process.env.NODE_ENV === 'production'
    ? defaultPreviewOrigin
    : 'http://localhost:3000')

export default defineConfig({
  name: 'default',
  title: 'simonask.io',

  projectId: studioProjectId,
  dataset: studioDataset,

  plugins: [
    codeInput(),
    structureTool({structure}),
    presentationTool({
      resolve,
      previewUrl: {
        origin: previewOrigin,
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
      allowOrigins: [
        'http://localhost:3000',
        'https://stage.simonask.io',
        'https://simonask.io',
        'https://www.simonask.io',
      ],
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
