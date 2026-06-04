import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  groups: [
    {name: 'article', title: 'Article', default: true},
    {name: 'publishing', title: 'Publishing'},
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      group: 'article',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'article',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      group: 'article',
      of: [{type: 'reference', to: [{type: 'postCategory'}]}],
      description:
        'Topics for this article. Use the Project category to list this post under Projects on the homepage (not Writing).',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      group: 'article',
      of: [{type: 'reference', to: [{type: 'projectTechnology'}]}],
      description:
        'Shown on the homepage Projects card when this post uses the Project category. Create entries under Technologies in the sidebar.',
    }),
    defineField({
      name: 'body',
      title: 'Article',
      type: 'blockContent',
      group: 'article',
      description:
        'Use the ⋯ menu on a line or the block picker to insert Image, Callout, or Code. This is not shortcodes — /callout typed in text stays plain text.',
    }),
    defineField({
      name: 'image',
      title: 'Cover image',
      type: 'image',
      group: 'publishing',
      description: 'Used on the post list and social previews — not for in-article photos.',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      group: 'publishing',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
})
