import { Post } from 'contentlayer/generated'

export function categorizePostsByYear(posts: Post[]) {

  const listOfAllYears = posts.map(post => {
    const date = new Date(post.publishedAt)

    return date.getFullYear()
  })

  const listOfUniqueYears = [...new Set(listOfAllYears)]

  const postsByYear = listOfUniqueYears.map(year => {
    return {
      year,
      posts: posts.filter(
        post => new Date(post.publishedAt).getFullYear() === year
      )
    }
  })

  return postsByYear.sort((a, b) => b.year - a.year)
}