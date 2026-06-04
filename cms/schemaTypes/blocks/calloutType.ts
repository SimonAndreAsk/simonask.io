import {InfoOutlineIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const calloutType = defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'tone',
      title: 'Tone',
      type: 'string',
      options: {
        list: [
          {title: 'Note', value: 'note'},
          {title: 'Info', value: 'info'},
          {title: 'Warning', value: 'warning'},
        ],
        layout: 'radio',
      },
      initialValue: 'note',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {text: 'text', tone: 'tone'},
    prepare({text, tone}) {
      const firstLine = text?.split('\n')[0]
      return {
        title: firstLine || 'Callout',
        subtitle: tone,
      }
    },
  },
})
