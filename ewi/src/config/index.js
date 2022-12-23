const API_ROOT = process.env.NODE_ENV === "development"
  ? require('./urls.js').DEV_API_ROOT
  : "/api";

const API2_ROOT = process.env.NODE_ENV === "development"
  ? require('./urls.js').DEV_API2_ROOT
  : "https://api.ergo.watch";
export { API_ROOT, API2_ROOT }
