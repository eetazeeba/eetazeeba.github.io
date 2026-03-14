module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("jsonLd", (value) => {
    if (value === undefined || value === null || value === false || value === "") {
      return "";
    }

    const normalizedValue = Array.isArray(value)
      ? value.filter((item) => item !== undefined && item !== null)
      : value;

    if (Array.isArray(normalizedValue) && normalizedValue.length === 0) {
      return "";
    }

    return JSON.stringify(normalizedValue, null, 2)
      .replace(/</g, "\\u003C")
      .replace(/>/g, "\\u003E")
      .replace(/&/g, "\\u0026")
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029");
  });

  eleventyConfig.addPassthroughCopy({ "src/_assets/CSS": "CSS" });
  eleventyConfig.addPassthroughCopy({ "src/_assets/Images": "Images" });
  eleventyConfig.addPassthroughCopy({ "src/_assets/scripts": "scripts" });
  eleventyConfig.addPassthroughCopy("src/admin/config.yml");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    },
    templateFormats: ["html", "njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
