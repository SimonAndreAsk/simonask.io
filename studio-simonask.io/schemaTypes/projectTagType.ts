import {defineField, defineType} from 'sanity'

export const projectTagType = defineType({
  name: 'projectTag',
  title: 'Project tag',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Tool or technology name, e.g. GA4, React, Sanity.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'label'},
    prepare({title}) {
      return {title: title || 'Tag'}
    },
  },
})
