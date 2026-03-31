const schema = require("../_data/schema");

module.exports = {
  layout: "layouts/base.njk",
  pagination: {
    data: "blog.publishedEntries",
    size: 1,
    alias: "entry"
  },
  permalink: (data) => data.entry.url,
  eleventyComputed: {
    title: (data) => data.entry.title,
    description: (data) => data.entry.summary,
    breadcrumbTitle: (data) => data.entry.title,
    breadcrumbs: (data) => {
      const breadcrumbs = [
        { title: "Home", url: "/" },
        { title: "Blog", url: "/blog/" }
      ];

      if (data.entry.bucketIsPublic) {
        breadcrumbs.push({
          title: data.entry.bucketTitle,
          url: data.entry.bucketUrl
        });
      }

      breadcrumbs.push({
        title: data.entry.title,
        url: data.entry.url
      });

      return breadcrumbs;
    },
    type: "blog",
    author: (data) => data.entry.author,
    summary: (data) => data.entry.summary,
    published_at: (data) => data.entry.publishedAt,
    updated_at: (data) => data.entry.updatedAt,
    articleSection: (data) => data.entry.bucketTitle,
    socialImagePath: (data) => data.entry.socialImagePath || data.site.socialImagePath,
    jsonLd: (data) => schema.mergeJsonLd(
      schema.buildBreadcrumbList(data.breadcrumbs, data.site),
      schema.buildArticle({
        ...data,
        title: data.entry.title,
        summary: data.entry.summary,
        author: data.entry.author,
        published_at: data.entry.publishedAt,
        updated_at: data.entry.updatedAt,
        articleImagePath: data.entry.socialImagePath,
        articleSection: data.entry.bucketTitle,
        type: "blog",
        status: "published"
      })
    )
  }
};