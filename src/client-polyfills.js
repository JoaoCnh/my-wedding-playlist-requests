import { isSafari } from "~/lib/device";

if (isSafari) {
  import("seamless-scroll-polyfill").then((module) => {
    module.elementScrollIntoViewPolyfill({
      forcePolyfill: true,
    });
  });
}
