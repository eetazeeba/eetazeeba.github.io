const schema = require("../../_data/schema");

module.exports = schema.createSectionPageData({
  sectionTitle: "Articles",
  sectionUrl: "/blog/articles/",
  includeArticleSchema: true,
  parentBreadcrumbs: [
    { title: "Home", url: "/" },
    { title: "Blog", url: "/blog/" }
  ]
});
