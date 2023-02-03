const isClient = typeof window !== "undefined";

export const isSafari =
  isClient &&
  /Apple/i.test(navigator.vendor) &&
  /Safari/i.test(navigator.userAgent);
