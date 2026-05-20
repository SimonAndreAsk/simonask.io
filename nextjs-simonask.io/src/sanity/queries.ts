export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`

export const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  image,
  excerpt,
  "excerptText": coalesce(excerpt, pt::text(body)),
  "categories": categories[]-> {
    _id,
    label
  }
}`

export const SLUGS_QUERY = `*[_type == "post" && defined(slug.current)].slug.current`

/** Homepage project cards — ordered by publish date. */
export const PROJECTS_QUERY = `*[_type == "project" && defined(url)] | order(publishedAt desc) {
  _id,
  title,
  url,
  summary,
  publishedAt,
  image,
  "tags": tags[]-> {
    _id,
    label
  }
}`

/** Homepage experience timeline — ordered by sort date (most recent first). */
export const EXPERIENCE_QUERY = `*[_type == "experience" && defined(title)] | order(publishedAt desc) {
  _id,
  title,
  subtitle,
  period,
  href,
  logoAlt,
  logoImage,
  details,
  publishedAt
}`
