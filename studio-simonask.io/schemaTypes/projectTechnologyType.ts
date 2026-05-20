import {defineField, defineType} from 'sanity'

export const projectTechnologyType = defineType({
  name: 'projectTechnology',
  title: 'Technology',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Technology name, e.g. GA4, React, Sanity.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'label'},
    prepare({title}) {
      return {title: title || 'Technology'}
    },
  },
})
