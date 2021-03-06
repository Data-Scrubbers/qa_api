import { sleep } from "k6";
import http from "k6/http";

export const options = {
  stages: [
    { duration: "1m", target: 10 },
    { duration: "1m", target: 1000 },
    { duration: "3m", target: 2500 },
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

  // Post questions
  response = http.post(
    "http://localhost:3000/qa/questions/?body=asdfasdf&name=sldkjfa%3Bslkd&email=aslkdjf&product_id=14"
  );

  // Automatically added sleep
  sleep(1);
}
