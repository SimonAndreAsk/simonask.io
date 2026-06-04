import {defineField, defineType} from 'sanity'

export const experienceType = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  groups: [{name: 'details', title: 'Details', default: true}],
  fields: [
    defineField({
      name: 'title',
      title: 'Organization',
      type: 'string',
      group: 'details',
      description: 'Employer or client name shown as the entry heading.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Role',
      type: 'string',
      group: 'details',
      description: 'Job title and context, e.g. "Digital Analytics Specialist · internship".',
    }),
    defineField({
      name: 'period',
      title: 'Period',
      type: 'string',
      group: 'details',
      description: 'Display dates, e.g. "Mar 2026–Jun 2026".',
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'url',
      group: 'details',
      description: 'Optional external link for the organization name.',
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo label',
      type: 'string',
      group: 'details',
      description:
        'Accessibility label and fallback letter in the round logo when no image is uploaded.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logoImage',
      title: 'Logo image',
      type: 'image',
      group: 'details',
      options: {hotspot: true},
      description:
        'Optional round logo on the homepage (recommended square, at least 96×96 px).',
    }),
    defineField({
      name: 'details',
      title: 'Highlights',
      type: 'array',
      group: 'details',
      of: [
        {
          type: 'text',
          rows: 3,
        },
      ],
      description: 'One or more short bullets or a single summary paragraph.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Sort date',
      type: 'datetime',
      group: 'details',
      description:
        'Controls order on the homepage (most recent roles first). Set to the role start or end date.',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      period: 'period',
      media: 'logoImage',
    },
    prepare({title, subtitle, period, media}) {
      return {
        title: title || 'Experience',
        subtitle: [subtitle, period].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
