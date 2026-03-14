const schema = require("../../_data/schema");

module.exports = schema.createSectionPageData({
  sectionTitle: "Case Studies",
  sectionUrl: "/blog/case-studies/",
  includeArticleSchema: true,
  parentBreadcrumbs: [
    { title: "Home", url: "/" },
    { title: "Blog", url: "/blog/" }
  ]
});
