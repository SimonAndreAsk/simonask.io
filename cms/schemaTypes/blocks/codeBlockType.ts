import {CodeBlockIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

const languageAlternatives = [
  {title: 'TypeScript', value: 'typescript'},
  {title: 'JavaScript', value: 'javascript'},
  {title: 'CSS', value: 'css'},
  {title: 'HTML', value: 'html'},
  {title: 'Shell', value: 'shell'},
  {title: 'JSON', value: 'json'},
  {title: 'Plain text', value: 'text'},
]

export const codeBlockType = defineType({
  name: 'codeBlock',
  title: 'Code',
  type: 'object',
  icon: CodeBlockIcon,
  fields: [
    defineField({
      name: 'code',
      title: 'Code',
      type: 'code',
      options: {
        language: 'typescript',
        languageAlternatives,
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {code: 'code.code', language: 'code.language'},
    prepare({code, language}) {
      return {
        title: code?.slice(0, 48) || 'Code',
        subtitle: language,
      }
    },
  },
})
