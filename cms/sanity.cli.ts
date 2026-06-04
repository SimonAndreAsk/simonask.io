import {defineCliConfig} from 'sanity/cli'

import {studioDataset, studioProjectId} from './config/env'

export default defineCliConfig({
  api: {
    projectId: studioProjectId,
    dataset: studioDataset,
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    appId: 'e7uqq72kadcf7dluamou1585',
  },
  studioHost: 'simonask',
})
