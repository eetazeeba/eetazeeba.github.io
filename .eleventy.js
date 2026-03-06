module.exports = function(eleventyConfig) {
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
