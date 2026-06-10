const META_PIXEL_ID = "1544442653862459";
const META_PIXEL_SCRIPT_ID = "meta-pixel-script";

let isMetaPixelInitialized = false;
let lastTrackedPageViewPath = "";

const canUseMetaPixel = () =>
  process.env.NODE_ENV === "production" &&
  typeof window !== "undefined" &&
  typeof document !== "undefined";

const loadMetaPixel = () => {
  if (!canUseMetaPixel()) {
    return null;
  }

  if (window.fbq) {
    return window.fbq;
  }

  const fbq = function metaPixelQueue() {
    if (fbq.callMethod) {
      fbq.callMethod.apply(fbq, arguments);
      return;
    }

    fbq.queue.push(arguments);
  };

  if (!window._fbq) {
    window._fbq = fbq;
  }

  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;

  if (!document.getElementById(META_PIXEL_SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = META_PIXEL_SCRIPT_ID;
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";

    const firstScript = document.getElementsByTagName("script")[0];
    if (firstScript?.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }

  return fbq;
};

export const initMetaPixel = () => {
  const fbq = loadMetaPixel();

  if (!fbq) {
    return false;
  }

  if (!isMetaPixelInitialized) {
    fbq("init", META_PIXEL_ID);
    isMetaPixelInitialized = true;
  }

  return true;
};

export const trackMetaPageView = (pagePath) => {
  const nextPagePath =
    pagePath || `${window.location.pathname}${window.location.search}`;

  if (lastTrackedPageViewPath === nextPagePath) {
    return;
  }

  if (!initMetaPixel()) {
    return;
  }

  window.fbq("track", "PageView");
  lastTrackedPageViewPath = nextPagePath;
};

export const trackMetaLead = () => {
  if (!initMetaPixel()) {
    return;
  }

  window.fbq("track", "Lead", {
    content_name: "Nowy nabor - formularz",
  });
};
