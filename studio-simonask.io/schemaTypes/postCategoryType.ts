import {defineField, defineType} from 'sanity'

export const postCategoryType = defineType({
  name: 'postCategory',
  title: 'Post category',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Category shown on the homepage writing list, e.g. Analytics, Career.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'label'},
    prepare({title}) {
      return {title: title || 'Category'}
    },
  },
})
