function parseEnabledFlag(value) {
  return typeof value === "string" && value.trim().toLowerCase() === "true";
}

function parseString(value) {
  return typeof value === "string" ? value.trim() : "";
}

module.exports = {
  enabled: parseEnabledFlag(process.env.ANALYTICS_ENABLED),
  provider: parseString(process.env.ANALYTICS_PROVIDER).toLowerCase(),
  domain: parseString(process.env.ANALYTICS_DOMAIN).toLowerCase()
};
