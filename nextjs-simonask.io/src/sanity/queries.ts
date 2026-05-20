export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`

export const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)`

export const SLUGS_QUERY = `*[_type == "post" && defined(slug.current)].slug.current`

/** Homepage project cards — ordered by publish date. */
export const PROJECTS_QUERY = `*[_type == "project" && defined(url)] | order(publishedAt desc) {
  _id,
  title,
  url,
  summary,
  publishedAt,
  image
}`
