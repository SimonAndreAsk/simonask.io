import {defineMigration, delete_} from 'sanity/migrate'

/** Step 2b: delete legacy projectTag documents (after clear-project-technology-refs). */
export default defineMigration({
  title: 'Technologies step 2b: delete projectTag documents',
  documentTypes: ['projectTag'],
  migrate: {
    document(doc) {
      return delete_(doc._id)
    },
  },
})
