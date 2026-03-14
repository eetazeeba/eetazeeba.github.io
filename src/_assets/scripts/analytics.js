(function () {
  var ROOT_CONFIG_KEY = "__MUSIFER_ANALYTICS__";
  var API_KEY = "musiferAnalytics";
  var MAX_EVENT_NAME_LENGTH = 64;
  var MAX_PROP_KEY_LENGTH = 64;
  var MAX_PROP_VALUE_LENGTH = 256;

  function asString(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function asBoolean(value) {
    if (typeof value === "boolean") return value;
    return asString(value).toLowerCase() === "true";
  }

  function normalizeToken(value, maxLength) {
    var normalized = asString(value)
      .toLowerCase()
      .replace(/[^a-z0-9_\s-]/g, "")
      .replace(/[\s-]+/g, "_")
      .replace(/_+/g, "_")
      .replace(/^_+|_+$/g, "");

    if (!normalized) return "";
    return normalized.slice(0, maxLength || normalized.length);
  }

  function normalizeProvider(value) {
    return normalizeToken(value, 32);
  }

  function normalizePath(pathOverride) {
    var candidate = asString(pathOverride);
    if (candidate) {
      try {
        var parsed = new URL(candidate, window.location.href);
        return parsed.pathname + parsed.search;
      } catch (error) {
        if (candidate.charAt(0) === "/") return candidate;
      }
    }

    if (!window.location || typeof window.location.pathname !== "string") {
      return "/";
    }

    return window.location.pathname + (window.location.search || "");
  }

  function isSerializablePrimitive(value) {
    var type = typeof value;
    if (type === "string") return true;
    if (type === "boolean") return true;
    if (type === "number") return Number.isFinite(value);
    return false;
  }

  function normalizePropValue(value) {
    if (!isSerializablePrimitive(value)) return null;

    if (typeof value === "string") {
      var trimmed = value.trim();
      if (!trimmed) return null;
      return trimmed.slice(0, MAX_PROP_VALUE_LENGTH);
    }

    return value;
  }

  function normalizeProps(props) {
    if (!props || typeof props !== "object" || Array.isArray(props)) {
      return {};
    }

    var normalized = {};
    var keys = Object.keys(props);

    keys.forEach(function (key) {
      var cleanKey = normalizeToken(key, MAX_PROP_KEY_LENGTH);
      if (!cleanKey) return;

      var cleanValue = normalizePropValue(props[key]);
      if (cleanValue === null) return;

      normalized[cleanKey] = cleanValue;
    });

    return normalized;
  }

  function mergeProps(baseProps, extraProps) {
    var merged = {};
    var base = normalizeProps(baseProps);
    var extra = normalizeProps(extraProps);

    Object.keys(base).forEach(function (key) {
      merged[key] = base[key];
    });

    Object.keys(extra).forEach(function (key) {
      merged[key] = extra[key];
    });

    return merged;
  }

  function normalizeDomain(value) {
    return asString(value).toLowerCase();
  }

  function readConfig() {
    var source = window[ROOT_CONFIG_KEY] || {};

    return {
      enabled: asBoolean(source.enabled),
      provider: normalizeProvider(source.provider),
      domain: normalizeDomain(source.domain)
    };
  }

  function isHostnameAllowed(domain) {
    if (!domain) return false;
    if (!window.location || typeof window.location.hostname !== "string") {
      return false;
    }

    var host = window.location.hostname.toLowerCase();
    if (!host) return false;
    if (host === domain) return true;
    return host.slice(-(domain.length + 1)) === "." + domain;
  }

  var adapters = {
    umami: {
      isAvailable: function () {
        return !!(window.umami && typeof window.umami.track === "function");
      },
      trackEvent: function (name, props) {
        if (props && Object.keys(props).length) {
          window.umami.track(name, props);
          return true;
        }

        window.umami.track(name);
        return true;
      }
    }
  };

  function shouldTrack(config) {
    if (!config.enabled) return false;
    if (!config.provider) return false;
    if (!config.domain) return false;
    if (!isHostnameAllowed(config.domain)) return false;

    var adapter = adapters[config.provider];
    if (!adapter) return false;
    if (!adapter.isAvailable()) return false;

    return true;
  }

  function dispatchEvent(rawName, rawProps) {
    var eventName = normalizeToken(rawName, MAX_EVENT_NAME_LENGTH);
    if (!eventName) return false;

    var config = readConfig();
    if (!shouldTrack(config)) return false;

    var adapter = adapters[config.provider];
    var props = normalizeProps(rawProps);

    try {
      return adapter.trackEvent(eventName, props);
    } catch (error) {
      return false;
    }
  }

  function safeDomainFromUrl(url) {
    var candidate = asString(url);
    if (!candidate) return "";

    try {
      return new URL(candidate, window.location.href).hostname.toLowerCase();
    } catch (error) {
      return "";
    }
  }

  function trackPageView(pathOverride) {
    var path = normalizePath(pathOverride);
    return dispatchEvent("page_view", { path: path });
  }

  function trackEvent(name, props) {
    return dispatchEvent(name, props);
  }

  function trackCTA(id, props) {
    var ctaId = normalizeToken(id, MAX_PROP_VALUE_LENGTH);
    if (!ctaId) return false;
    return dispatchEvent("cta_click", mergeProps(props, { cta_id: ctaId }));
  }

  function trackOutbound(url, props) {
    var targetUrl = asString(url);
    if (!targetUrl) return false;

    var nextProps = mergeProps(props, {
      url: targetUrl.slice(0, MAX_PROP_VALUE_LENGTH),
      link_domain: safeDomainFromUrl(targetUrl)
    });

    return dispatchEvent("outbound_click", nextProps);
  }

  function trackContact(status, props) {
    var cleanStatus = normalizeToken(status, 40);
    if (!cleanStatus) return false;
    return dispatchEvent("contact_" + cleanStatus, props);
  }

  function getState() {
    var config = readConfig();
    var adapter = adapters[config.provider];
    var adapterAvailable = !!(adapter && adapter.isAvailable());
    var hostAllowed = isHostnameAllowed(config.domain);

    return {
      enabled: config.enabled,
      provider: config.provider,
      domain: config.domain,
      hostAllowed: hostAllowed,
      adapterAvailable: adapterAvailable,
      active: config.enabled && hostAllowed && adapterAvailable
    };
  }

  window[API_KEY] = {
    trackPageView: trackPageView,
    trackEvent: trackEvent,
    trackCTA: trackCTA,
    trackOutbound: trackOutbound,
    trackContact: trackContact,
    getState: getState
  };
})();
