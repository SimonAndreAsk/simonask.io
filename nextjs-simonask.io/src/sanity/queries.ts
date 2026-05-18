export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`

export const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)`

export const SLUGS_QUERY = `*[_type == "post" && defined(slug.current)].slug.current`
