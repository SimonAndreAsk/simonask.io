import {defineLocations, type PresentationPluginOptions} from 'sanity/presentation'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    post: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Untitled',
            href: doc?.slug ? `/${doc.slug}` : '/',
          },
          {
            title: 'Home',
            href: '/',
          },
        ],
      }),
    }),
    project: defineLocations({
      select: {
        title: 'title',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Project',
            href: '/#projects',
          },
          {
            title: 'Home',
            href: '/',
          },
        ],
      }),
    }),
    experience: defineLocations({
      select: {
        title: 'title',
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || 'Experience',
            href: '/#experience',
          },
          {
            title: 'Home',
            href: '/',
          },
        ],
      }),
    }),
  },
}
