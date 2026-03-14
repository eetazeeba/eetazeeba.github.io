const schema = require("./_data/schema");

module.exports = {
  eleventyComputed: {
    description: (data) => data.site.description,
    jsonLd: (data) => schema.mergeJsonLd(data.jsonLd, schema.buildOrganization(data.site))
  }
};
