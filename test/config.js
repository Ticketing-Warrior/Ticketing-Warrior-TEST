import ENV from "../config.env.js";

export const CONFIG = {
  ...ENV,
  BASE: ENV.BASE_URL,
};
