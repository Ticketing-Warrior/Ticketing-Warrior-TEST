import http from "k6/http";
import { sleep, check, group } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

import { CONFIG } from "./config.js";
import { postJSON } from "./utils.js";
import { getRandomSeatId } from "./seats.js";

export const options = {
  vus: CONFIG.VUS,
  duration: CONFIG.DURATION,
};

export default function () {
  const nickname = `user_${__VU}_${__ITER}`;
  const seatId = getRandomSeatId();

  /* 1) 대기열 진입 */
  group("Queue → Insert", () => {
    const res = postJSON(`${CONFIG.BASE}/queue/insert`, { nickname });
    check(res, { "대기열 진입": (r) => r.status === 200 });
  });

  sleep(1);

  /* 2) 대기열 통과 */
  group("Queue → Pop", () => {
    const res = postJSON(`${CONFIG.BASE}/queue/pop`, { nickname });
    check(res, { "대기열 통과": (r) => r.status === 200 });
  });

  sleep(1);

  /* 3) 좌석 조회 */
  group("Seat → Single", () => {
    const res = http.get(`${CONFIG.BASE}/seat/single?seatId=${seatId}`);
    check(res, { "좌석 조회": (r) => r.status === 200 });
  });

  sleep(Math.random() * 2 + 1);
/* 4) 좌석 선택 + 예매 확정 */
group("4) 좌석 선택 + 예매 확정", () => {
  let success = false;
  let attempts = 0;
  const maxRetries = 5;

  while (!success && attempts < maxRetries) {
    attempts++;
    const trySeatId = getRandomSeatId();

    const res = postJSON(`${CONFIG.BASE}/record/confirm`, {
      seatId: trySeatId,
    });

    // 반복문 내 체크는 모두 “예매 시도"로 통일
    check(res, {
      "예매 시도": (r) => r.status === 200 || r.status === 409,
    });

    if (res.status === 200) {
      console.log(`예매 성공 | 좌석 ${trySeatId} | 유저 ${nickname}`);

      // 성공 체크 딱 1회만 기록
      check(res, { "예매 성공": () => true });
      success = true;
      break;
    } else {
      console.log(`예매 실패(${attempts}) | 좌석 ${trySeatId}`);
    }

    sleep(0.3);
  }

  // 5회 다 실패한 경우에만 실패 체크 추가
  if (!success) {
    check(null, { "예매 실패": () => false });
  }
});
}

export function handleSummary(data) {
  return {
    "reports/ticketing_report.html": htmlReport(data),
  };
}
