import {at, defineMigration, unset} from 'sanity/migrate'

/** Step 2a: remove references so projectTag docs can be deleted. */
export default defineMigration({
  title: 'Technologies step 2a: clear project technology refs',
  documentTypes: ['project'],
  filter: 'defined(technologies)',
  migrate: {
    document(doc) {
      return [at('technologies', unset())]
    },
  },
})
