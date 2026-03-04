module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/CSS");
  eleventyConfig.addPassthroughCopy("src/Images");
  eleventyConfig.addPassthroughCopy("src/scripts");
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
