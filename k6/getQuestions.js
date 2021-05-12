import { sleep } from "k6";
import http from "k6/http";

export const options = {
  stages: [
    { duration: "5m", target: 1000 }
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

  response = http.get("http://localhost:3000/qa/questions/?product_id=19");

  // Automatically added sleep
  sleep(1);
}