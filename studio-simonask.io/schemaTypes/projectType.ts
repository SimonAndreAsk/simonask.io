import {defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [{name: 'details', title: 'Details', default: true}],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Project link',
      type: 'url',
      group: 'details',
      description: 'Repository, live site, or case study URL.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      group: 'details',
      description: 'Short blurb shown on the homepage.',
    }),
    defineField({
      name: 'image',
      title: 'Thumbnail',
      type: 'image',
      group: 'details',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Short description of the image for accessibility.',
        }),
      ],
      description:
        'Square image on the homepage (recommended 512×512 px, 1:1). Screenshot or brand mark works well — use hotspot to set crop focus.',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      group: 'details',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
})
