/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

import VueKonva from "vue-konva";

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData, // site metadata
}) => {
  // ...apply enhancements for the site.
  Vue.use(VueKonva);
  router.afterEach((to, from) => {
    if (from.path !== to.path) {
      if (typeof window !== "undefined" && window.DISQUS) {
        setTimeout(() => {
          console.log("DISQUS is existing and try to load!");
          window.DISQUS.reset({ reload: true });
        }, 0);
      }
    } else {
      // same page but hash changed
    }
  });
};
