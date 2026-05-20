import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Writing')
        .child(
          S.list()
            .title('Writing')
            .items([
              S.listItem()
                .title('Drafts')
                .child(
                  S.documentList()
                    .title('Drafts')
                    .filter('_type == "post" && _id in path("drafts.**")')
                    .defaultOrdering([{field: '_updatedAt', direction: 'desc'}]),
                ),
              S.listItem()
                .title('Published')
                .child(
                  S.documentList()
                    .title('Published')
                    .filter('_type == "post" && !(_id in path("drafts.**"))')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
                ),
              S.divider(),
              S.listItem()
                .title('All posts')
                .child(
                  S.documentList()
                    .title('All posts')
                    .filter('_type == "post"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
                ),
            ]),
        ),
      S.listItem()
        .title('Homepage')
        .child(
          S.list()
            .title('Homepage')
            .items([
              S.listItem()
                .title('Projects')
                .child(
                  S.documentList()
                    .title('Projects')
                    .filter('_type == "project"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
                ),
              S.listItem()
                .title('Experience')
                .child(
                  S.documentList()
                    .title('Experience')
                    .filter('_type == "experience"')
                    .defaultOrdering([{field: 'publishedAt', direction: 'desc'}]),
                ),
            ]),
        ),
      S.listItem()
        .title('Taxonomies')
        .child(
          S.list()
            .title('Taxonomies')
            .items([
              S.listItem()
                .title('Technologies')
                .child(
                  S.documentList()
                    .title('Technologies')
                    .filter('_type == "projectTechnology"')
                    .defaultOrdering([{field: 'label', direction: 'asc'}]),
                ),
              S.listItem()
                .title('Post categories')
                .child(
                  S.documentList()
                    .title('Post categories')
                    .filter('_type == "postCategory"')
                    .defaultOrdering([{field: 'label', direction: 'asc'}]),
                ),
            ]),
        ),
    ])
