import { sleep } from "k6";
import http from "k6/http";

export const options = {
  stages: [
    { duration: "1m", target: 10 },
    { duration: "1m", target: 1000},
    { duration: "3m", target: 1000 },
  ],
  ext: {
    loadimpact: {
      distribution: {
        "amazon:us:ashburn": { loadZone: "amazon:us:ashburn", percent: 100 },
      },
    },
  },
};

export default function main() {
  let response;

  response = http.put("http://localhost:3000/qa/questions/75/report");

  // Automatically added sleep
  sleep(1);
}
