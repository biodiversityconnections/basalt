const path = require("path")
const contentful = require("contentful")
const { GraphQLString, GraphQLJSON } = require("gatsby/graphql")

const ContentfulClient = contentful.createClient({
  space: process.env.GATSBY_CONTENTFUL_SPACE_ID,
  accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
})

let defaultLocale = {}
let locales = []

ContentfulClient.getLocales().then(data => {
  locales = data.items
  data.items.forEach(locale => {
    if (locale.default) {
      defaultLocale = locale
    }
  })
})

let translations = {}
let transBlog = ""
let transCategories = ""
let transCategory = ""
ContentfulClient.getEntries({
  content_type: "translations",
  locale: "*",
})
  .then(data => {
    translations = data.items[0].fields
    transBlog = translations.blog[defaultLocale.code]
    transCategories = translations.categories[defaultLocale.code]
    transCategory = translations.category[defaultLocale.code]
  })
  .catch(console.error)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  locales.forEach(locale => {
    return graphql(`
      {

        translations: allContentfulTranslations {
          nodes {
            languages
            writtenByAuthorOnDate
            blog
            categories
            category
            tags
            noSearchResults
          }
        }

        pages: allContentfulPage (filter: {node_locale: {eq: "${locale.code}"}}) {
          nodes {
            contentful_id
            fields {
              slug
            }
            title
            createdAt
            node_locale

            featuredImage {
              fluid {
                sizes
                srcSet
                src
                base64
                aspectRatio
                srcSetWebp
                srcWebp
              }
            }

            body {
              childMarkdownRemark {
                html
              }
            }
          }
        }

        blogposts: allContentfulBlogPost (filter: {node_locale: {eq: "${locale.code}"}}) {
          nodes {
            id: contentful_id
            fields {
              slug
            }
            node_locale
            createdAt(formatString: "D MMM YYYY, HH:MM")
            title
            author
            excerpt

            featuredImage {
              fluid {
                sizes
                srcSet
                src
                base64
                aspectRatio
                srcSetWebp
                srcWebp
              }
            }

            body {
              childMarkdownRemark {
                html
              }
            }
            categories {
              contentful_id
              title
            }
            tags
          }
        }

        categories: allContentfulCategory (filter: {node_locale: {eq: "${locale.code}"}}) {
          nodes {
            contentful_id
            node_locale
            fields {
              slug
            }
            title
            description {
              childMarkdownRemark {
                html
              }
            }
            
            featuredImage {
              contentful_id
              fluid {
                sizes
                srcSet
                src
                base64
                aspectRatio
                srcSetWebp
                srcWebp
              }
            }

            blog_post {
              title
              fields {
                slug
              }
              node_locale
              contentful_id
              createdAt(formatString: "D MMM YYYY, HH:MM")
            }
          }
        }

      }
    `).then(res => {
      if (res.errors) {
        return Promise.reject(res.errors)
      }

      // PAGE
      const pages = res.data.pages.nodes
      pages.forEach(page => {
        createPage({
          path: page.fields.slug,
          component: path.resolve("src/templates/Page.js"),
          context: {
            page,
          },
        })
      })

      // BLOGPOST
      let blogposts = res.data.blogposts.nodes
      blogposts.forEach(post => {
        createPage({
          path: post.fields.slug,
          component: path.resolve("src/templates/BlogPost.js"),
          context: {
            locale: locale.code,
            post,
            translations,
          },
        })
      })

      // BLOG
      let bloglist = []
      const postsPerPage = 1
      while (blogposts.length) {
        let slice = blogposts.splice(0, postsPerPage)
        bloglist.push(slice)
      }

      bloglist.forEach((postSlice, i) => {
        const blogSlug =
          locale.code === defaultLocale.code
            ? `/${transBlog}`
            : `/${locale.code}/${transBlog}`
        createPage({
          path: i === 0 ? blogSlug : `${blogSlug}/${i + 1}`,
          component: path.resolve("src/templates/Blog.js"),
          context: {
            defaultLocale: defaultLocale.code,
            locale: locale.code,
            translations,
            numPages: bloglist.length,
            blogposts: postSlice,
            currentPage: i + 1,
          },
        })
      })

      // createPage({
      //   path:
      //     locale.code === defaultLocale.code
      //       ? `/${transBlog}`
      //       : `/${locale.code}/${transBlog}`,
      //   component: path.resolve("src/templates/Blog.js"),
      //   context: {
      //     locale: locale.code,
      //     blogposts,
      //     translations,
      //   },
      // })

      // CATEGORY
      const categories = res.data.categories.nodes
      categories.forEach(category => {
        createPage({
          path: category.fields.slug,
          component: path.resolve("src/templates/Category.js"),
          context: {
            locale: locale.code,
            category,
            translations,
          },
        })
      })

      // CATEGORIES
      createPage({
        path:
          locale.code === defaultLocale.code
            ? `/${transCategories}`
            : `/${locale.code}/${transCategories}`,
        component: path.resolve("src/templates/Categories.js"),
        context: {
          locale: locale.code,
          categories,
          translations,
        },
      })
      // Create page for tags.
    })
  })
}

const punctuation = /[`~!@#$%^&*()_+-={}\[\];:'",.<>\/?\\\|]/g

const makeSlug = (slug, title) => {
  return slug
    ? slug
    : `/${title
        .replace(punctuation, "")
        .replace(/\s/g, "-")
        .toLowerCase()}`
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `ContentfulPage`) {
    const slug =
      node.node_locale === defaultLocale.code
        ? `/${node.slug === "/" ? "" : node.slug}`
        : `/${node.node_locale}${node.slug}`

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }

  if (node.internal.type === `ContentfulBlogPost`) {
    const slug =
      node.node_locale === defaultLocale.code
        ? `/${transBlog}${node.slug}`
        : `/${node.node_locale}/${transBlog}${node.slug}`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }

  if (node.internal.type === `ContentfulCategory`) {
    const slug =
      node.node_locale === defaultLocale.code
        ? `/${transCategory}${node.slug}`
        : `/${node.node_locale}/${transCategory}${node.slug}`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.setFieldsOnGraphQLNodeType = ({ type }) => {
  if (type.name === `Site`) {
    return {
      defaultLocale: {
        type: GraphQLJSON,
        args: {},
        resolve: (source, fieldArgs) => {
          return defaultLocale
        },
      },
      locales: {
        type: GraphQLJSON,
        args: {},
        resolve: (source, fieldArgs) => {
          return locales
        },
      },
      translations: {
        type: GraphQLJSON,
        args: {},
        resolve: (source, fieldArgs) => {
          return translations
        },
      },
    }
  }
  return {}
}
