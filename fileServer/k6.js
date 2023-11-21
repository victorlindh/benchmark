import http from 'k6/http'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.2/index.js'

export const options = {
  summaryTimeUnit: 'ms',
  summaryTrendStats: [
    'count',
    'avg',
    'min',
    'med',
    'max',
    'p(90)',
    'p(95)',
    'p(99)',
    'p(99.99)'
  ],
  iterations: 10000000,
  vus: 100
}

export default function () {
  http.get('http://localhost:3000')
}

export function handleSummary(data) {
  const vus = 'vus' in data.metrics ? data.metrics.vus.values.value : '-'
  const testRunDurationMs = data.state.testRunDurationMs
  const dataRecived = data.metrics.data_received.values.count

  const cold = data.metrics.cold_scenario_http_req_duration.values
  const coldObj = {
    vus,
    testRunDurationMs,
    count: cold.count,
    avg: cold.avg,
    min: cold.min,
    med: cold.med,
    max: cold.max,
    ['p(90)']: cold['p(90)'],
    ['p(95)']: cold['p(95)'],
    ['p(99)']: cold['p(99)'],
    ['p(99.99)']: cold['p(99.99)'],
    'data recived 1': dataRecived / cold.count
  }

  return {
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
    [`./summaries/${__ENV.DATE}/${__ENV.NAME}/cold.json`]:
      JSON.stringify(coldObj),
    [`./summaries/${__ENV.DATE}/${__ENV.NAME}/summary.html`]: htmlReport(data)
  }
}
