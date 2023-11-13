import http from 'k6/http'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js'
import { Trend } from 'k6/metrics'

const coldTrend = new Trend('cold_scenario_http_req_duration')
const warmTrend = new Trend('warm_scenario_http_req_duration')
const testDurationS = 5
const pauseDurationS = 1
const vus = 100

export const options = {
  iterations: 1
}

export default function () {
  http.get('http://localhost:3000')
}
