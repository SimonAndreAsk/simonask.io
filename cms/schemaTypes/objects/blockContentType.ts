import {defineArrayMember, defineType} from 'sanity'

import {blockContentInput} from './blockContentInput'

export const blockContentType = defineType({
  name: 'blockContent',
  title: 'Block content',
  type: 'array',
  components: {
    input: blockContentInput,
  },
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Number', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                validation: (rule) =>
                  rule.uri({
                    allowRelative: true,
                    scheme: ['http', 'https', 'mailto', 'tel'],
                  }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({type: 'figure'}),
    defineArrayMember({type: 'callout'}),
    defineArrayMember({type: 'codeBlock'}),
    defineArrayMember({type: 'mermaidDiagram'}),
  ],
})
