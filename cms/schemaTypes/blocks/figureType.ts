import {ImageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const figureType = defineType({
  name: 'figure',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  description: 'In-article image with optional caption.',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {media: 'image', caption: 'caption'},
    prepare({media, caption}) {
      return {
        title: caption || 'Image',
        media,
      }
    },
  },
})
