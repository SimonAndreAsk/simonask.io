import {at, defineMigration, set} from 'sanity/migrate'

/** Step 2d: restore project technology references (after create-project-technology-documents). */
const PROJECT_TECHNOLOGY_REFS: Record<string, Array<{_key: string; _ref: string; _type: 'reference'}>> = {
  '67c13f08-c82d-4740-8bd0-8b2576cc77c3': [
    {_key: '3158cbfe0eb2', _ref: '7ee2a53f-9084-4c06-8f21-59882e08dc6d', _type: 'reference'},
    {_key: '9a904b51dbd6', _ref: 'caca98a8-309f-4d1d-bd64-f68fe2267428', _type: 'reference'},
    {_key: 'f60223b6edd6', _ref: '87ba28d1-5f0a-4987-b5e3-25e5940909d2', _type: 'reference'},
    {_key: 'd5a7de6c11be', _ref: 'f7998a02-694f-4ccd-9381-5a7d83fe38ec', _type: 'reference'},
    {_key: '41c27d05f260', _ref: '0224295e-7e84-47b7-acd6-5ae1391aa735', _type: 'reference'},
  ],
}

export default defineMigration({
  title: 'Technologies step 2d: restore project technology refs',
  documentTypes: ['project'],
  filter: '_id in ["67c13f08-c82d-4740-8bd0-8b2576cc77c3"]',
  migrate: {
    document(doc) {
      const refs = PROJECT_TECHNOLOGY_REFS[doc._id]
      if (!refs) return
      return [at('technologies', set(refs))]
    },
  },
})
