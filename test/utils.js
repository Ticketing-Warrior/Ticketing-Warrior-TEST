import http from "k6/http";

export function postJSON(url, body = {}) {
  return http.post(url, JSON.stringify(body), {
    headers: { "Content-Type": "application/json" },
  });
}
