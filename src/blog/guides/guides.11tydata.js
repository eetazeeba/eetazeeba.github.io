const schema = require("../../_data/schema");

module.exports = schema.createSectionPageData({
  sectionTitle: "Guides",
  sectionUrl: "/blog/guides/",
  includeArticleSchema: true,
  parentBreadcrumbs: [
    { title: "Home", url: "/" },
    { title: "Blog", url: "/blog/" }
  ]
});