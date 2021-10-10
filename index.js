import getGoogle from './scenarios/get-google.js';
import { group, sleep } from 'k6';

export default function () {
  group('Endpoint Get Google - Index Page', () => {
    getGoogle();
  });

  sleep(1);
}

