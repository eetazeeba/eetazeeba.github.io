function absoluteUrl(site, pathOrUrl = "/") {
  if (!pathOrUrl) {
    return null;
  }

  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  const siteUrl = (site && site.url ? site.url : "").replace(/\/$/, "");
  const normalizedPath = pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`;

  return `${siteUrl}${normalizedPath}`;
}

function normalizeDate(value) {
  if (!value) {
    return null;
  }

  const raw = String(value).trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    return raw;
  }

  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(raw)) {
    return `${raw.replace(" ", "T")}:00Z`;
  }

  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(raw)) {
    return `${raw}:00Z`;
  }

  return raw.replace(" ", "T");
}

function normalizeAuthor(author) {
  if (!author) {
    return [];
  }

  const rawAuthors = Array.isArray(author) ? author : [author];

  return rawAuthors
    .map((entry) => {
      if (!entry) {
        return null;
      }

      if (typeof entry === "string") {
        return entry.trim();
      }

      if (typeof entry === "object" && typeof entry.value === "string") {
        return entry.value.trim();
      }

      return null;
    })
    .filter(Boolean)
    .map((name) => ({
      "@type": "Person",
      name
    }));
}

function asJsonLdArray(value) {
  if (!value) {
    return [];
  }

  return (Array.isArray(value) ? value : [value]).filter(Boolean);
}

function mergeJsonLd(...values) {
  const merged = values.flatMap(asJsonLdArray);

  if (merged.length === 0) {
    return undefined;
  }

  return merged.length === 1 ? merged[0] : merged;
}

function buildOrganization(site) {
  if (!site) {
    return null;
  }

  const organization = site.organization || {};
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl(site, organization.idPath || "/#organization"),
    name: organization.name || site.title,
    url: absoluteUrl(site, "/")
  };

  const description = organization.description || site.description;
  if (description) {
    schema.description = description;
  }

  const logoUrl = absoluteUrl(site, organization.logoPath || site.socialImagePath);
  if (logoUrl) {
    schema.logo = logoUrl;
  }

  if (Array.isArray(organization.sameAs) && organization.sameAs.length > 0) {
    schema.sameAs = organization.sameAs;
  }

  return schema;
}

function buildSectionBreadcrumbs({ sectionTitle, sectionUrl, pageUrl, pageTitle, parentBreadcrumbs }) {
  if (!sectionTitle || !sectionUrl || !pageUrl || !pageTitle) {
    return undefined;
  }

  const breadcrumbs = Array.isArray(parentBreadcrumbs) && parentBreadcrumbs.length > 0
    ? parentBreadcrumbs.filter((item) => item && item.title && item.url)
    : [{ title: "Home", url: "/" }];

  breadcrumbs.push({ title: sectionTitle, url: sectionUrl });

  if (pageUrl !== sectionUrl) {
    breadcrumbs.push({ title: pageTitle, url: pageUrl });
  }

  return breadcrumbs;
}

function buildBreadcrumbList(breadcrumbs, site) {
  if (!Array.isArray(breadcrumbs) || breadcrumbs.length < 2) {
    return null;
  }

  const itemListElement = breadcrumbs
    .filter((item) => item && item.title && item.url)
    .map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      item: absoluteUrl(site, item.url)
    }));

  if (itemListElement.length < 2) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement
  };
}

function buildArticle(data) {
  const isArticle = data && (data.schemaType === "Article" || data.type === "blog");
  if (!isArticle) {
    return null;
  }

  if (data.status && data.status !== "published") {
    return null;
  }

  const authors = normalizeAuthor(data.author);
  const publishedAt = normalizeDate(data.published_at);
  const modifiedAt = normalizeDate(data.updated_at);
  const canonicalUrl = absoluteUrl(data.site, data.page && data.page.url);

  if (!data.title || !publishedAt || authors.length === 0 || !canonicalUrl) {
    return null;
  }

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    author: authors.length === 1 ? authors[0] : authors,
    datePublished: publishedAt,
    publisher: {
      "@id": absoluteUrl(data.site, (data.site.organization && data.site.organization.idPath) || "/#organization")
    }
  };

  if (modifiedAt) {
    article.dateModified = modifiedAt;
  }

  if (data.summary || data.description) {
    article.description = data.summary || data.description;
  }

  if (data.copyright) {
    article.copyrightNotice = data.copyright;
  }

  const articleImage = data.articleImagePath || data.socialImagePath;
  if (articleImage) {
    article.image = absoluteUrl(data.site, articleImage);
  }

  if (data.articleSection) {
    article.articleSection = data.articleSection;
  }

  return article;
}

function createSectionPageData({ sectionTitle, sectionUrl, includeArticleSchema = false, parentBreadcrumbs }) {
  return {
    eleventyComputed: {
      breadcrumbs: (data) => buildSectionBreadcrumbs({
        sectionTitle,
        sectionUrl,
        pageUrl: data.page && data.page.url,
        pageTitle: data.breadcrumbTitle || (data.page && data.page.url === sectionUrl ? sectionTitle : data.title),
        parentBreadcrumbs
      }),
      jsonLd: (data) => {
        const breadcrumbs = buildSectionBreadcrumbs({
          sectionTitle,
          sectionUrl,
          pageUrl: data.page && data.page.url,
          pageTitle: data.breadcrumbTitle || (data.page && data.page.url === sectionUrl ? sectionTitle : data.title),
          parentBreadcrumbs
        });

        return mergeJsonLd(
          data.jsonLd,
          buildBreadcrumbList(breadcrumbs, data.site),
          includeArticleSchema ? buildArticle(data) : null
        );
      }
    }
  };
}

module.exports = {
  absoluteUrl,
  buildArticle,
  buildBreadcrumbList,
  buildOrganization,
  buildSectionBreadcrumbs,
  createSectionPageData,
  mergeJsonLd,
  normalizeDate
};
