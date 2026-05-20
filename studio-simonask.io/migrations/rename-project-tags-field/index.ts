import {at, defineMigration, setIfMissing, unset} from 'sanity/migrate'

/** Step 1 of 2: copy project.tags → project.technologies (refs unchanged). */
export default defineMigration({
  title: 'Technologies step 1: project.tags → technologies',
  documentTypes: ['project'],
  filter: 'defined(tags)',
  migrate: {
    document(doc) {
      return [
        at('technologies', setIfMissing(doc.tags)),
        at('tags', unset()),
      ]
    },
  },
})
