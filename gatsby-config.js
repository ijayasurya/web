siteMetadata {
  title: 'Gatsby',
  description: 'A static site generator',
  siteUrl: 'https://gatsbyjs.org',
  author: 'Author Name'
},
  
require(`dotenv`).config()

module.exports = {
  siteMetadata: {
    title: "Reflex",
    description: "Starter for Reflex.",
    siteUrl: process.env.SITE_URL || "http://localhost:8000",
  },
  plugins: [
  {
    resolve: 'gatsby-plugin-feed-generator',
    options: {
    generator: `GatsbyJS`,
    rss: true, // Set to true to enable rss generation
    json: true, // Set to true to enable json feed generation
    siteQuery: `
      {
        site {
          siteMetadata {
            title
            description
            siteUrl
            author
          }
        }
      }
    `,
    feeds: [
      {
        name: 'feed', // This determines the name of your feed file => feed.json & feed.xml
        query: `
        {
          allMarkdownRemark(
            sort: {order: DESC, fields: [frontmatter___date]},
            limit: 100,
            ) {
            edges {
              node {
                html
                frontmatter {
                  date
                  path
                  title
                }
              }
            }
          }
        }
        `,
        normalize: ({ query: { site, allMarkdownRemark } }) => {
          return allMarkdownRemark.edges.map(edge => {
            return {
              title: edge.node.frontmatter.title,
              date: edge.node.frontmatter.date,
              url: site.siteMetadata.siteUrl + edge.node.frontmatter.path,
              html: edge.node.html,
            }
          })
        },
      },
    ],
  },
  plugins: [
    "@reflexjs/gatsby-theme-base",
    "@reflexjs/gatsby-theme-post",
    {
      resolve: "@reflexjs/gatsby-plugin-metatags",
      options: {
        types: [`Page`, `Post`],
      },
    },
  ],
}
