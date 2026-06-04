import {ComponentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const mermaidDiagramType = defineType({
  name: 'mermaidDiagram',
  title: 'Mermaid diagram',
  type: 'object',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'code',
      title: 'Mermaid source',
      type: 'text',
      rows: 12,
      description:
        'Mermaid diagram syntax (flowchart, sequence, class, etc.). The site renders this as an interactive SVG.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {code: 'code'},
    prepare({code}) {
      const firstLine = code?.split('\n').find((line: string) => line.trim())?.trim()
      return {
        title: firstLine || 'Mermaid diagram',
        subtitle: 'Diagram',
      }
    },
  },
})
