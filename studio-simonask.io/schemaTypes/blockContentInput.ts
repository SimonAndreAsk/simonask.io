import {WithBlockSelector} from '@selvklart/sanity-block-selector'

/** Replaces the hard-to-find PTE ⋯ insert menu with a searchable block picker. */
export const blockContentInput = WithBlockSelector({
  type: 'portable-text',
  blockPreviews: [
    {
      title: 'Insert block',
      blocks: {
        figure: {
          description: 'In-article image with optional caption',
        },
        callout: {
          description: 'Note, info, or warning box',
        },
        codeBlock: {
          description: 'Syntax-highlighted code',
        },
      },
    },
  ],
  showOther: false,
  text: {
    dialogTitle: 'Insert block',
    searchPlaceholder: 'Search blocks…',
  },
})
