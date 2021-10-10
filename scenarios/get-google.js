import http from 'k6/http';
import { sleep } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';
import { check, fail } from 'k6';

const getGoogleDuration = new Trend('get_google_duration');
const getGoogleFailRate = new Rate('get_google_fail_rate');
const getGoogleSuccessRate = new Rate('get_google_success_rate');
const getGoogleReqs = new Rate('get_google_reqs');

export default function () {
  const res = http.get('https://www.google.com.br');
  
  getGoogleDuration.add(res.timings.duration);
  getGoogleReqs.add(1);
  getGoogleFailRate.add(res.status === 0 || res.status >= 400);
  getGoogleSuccessRate.add(res.status < 400);

  const durationMsg = `Max Duration ${4000/1000}s`;
  if (!check(res, { 'max duration': r => r.timings.duration < 4000 })) {
    fail(durationMsg);
  }

   sleep(1);
}

