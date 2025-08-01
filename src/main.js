import { createApp, reactive } from "vue";
import { createGtm } from "@gtm-support/vue-gtm";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

const app = createApp(App);

app.config.globalProperties.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

app.config.globalProperties.$userData = reactive({
  name: null,
  csrfToken: "",
});

app.use(router).mount("#app");

app.use(
  createGtm({
    id: "GTM-T2VHZF4", // Your GTM single container ID, array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy'] or array of objects [{id: 'GTM-xxxxxx', queryParams: { gtm_auth: 'abc123', gtm_preview: 'env-4', gtm_cookies_win: 'x'}}, {id: 'GTM-yyyyyy', queryParams: {gtm_auth: 'abc234', gtm_preview: 'env-5', gtm_cookies_win: 'x'}}], // Your GTM single container ID or array of container ids ['GTM-xxxxxx', 'GTM-yyyyyy']
    queryParams: {
      // Add URL query string when loading gtm.js with GTM ID (required when using custom environments)
    },
    defer: false, // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
    compatibility: false, // Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`
    //nonce: "2726c7f26c", // Will add `nonce` to the script tag
    enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
    debug: true, // Whether or not display console logs debugs (optional)
    loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
    vueRouter: router, // Pass the router instance to automatically sync with router (optional)
    ignoredViews: [], // Don't trigger events for specified router names (optional)
    trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
  })
);
