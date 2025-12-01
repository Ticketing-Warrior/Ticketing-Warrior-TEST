import http from "k6/http";
import { sleep, check } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  vus: 10,
  duration: "5s",
};

export default function () {
  const res = http.get("http://localhost:3000/health");
  check(res, { "status 200": (r) => r.status === 200 });
  sleep(1);
}

// 여기서 reports 폴더에 파일 저장함
export function handleSummary(data) {
  return {
    "reports/report.html": htmlReport(data),
  };
}
