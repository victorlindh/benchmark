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
  scenarios: {
    cold_scenario: {
      executor: 'constant-vus',
      exec: 'cold',
      startTime: '0s',
      duration: `${testDurationS}s`,
      vus: vus
    },
    warm_scenario: {
      executor: 'constant-vus',
      exec: 'warm',
      startTime: `${testDurationS + pauseDurationS}s`,
      duration: `${testDurationS}s`,
      vus: vus
    }
  }
}

export function cold() {
  const r = http.get(`http://localhost:${__ENV.PORT}`)
  coldTrend.add(r.timings.duration)
}

export function warm() {
  const r = http.get(`http://localhost:${__ENV.PORT}`)
  warmTrend.add(r.timings.duration)
}

export function handleSummary(data) {
  const vus = 'vus' in data.metrics ? data.metrics.vus.values.value : '-'
  const testRunDurationMs = data.state.testRunDurationMs

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
    ['p(99.99)']: cold['p(99.99)']
  }

  const warm = data.metrics.warm_scenario_http_req_duration.values
  const warmObj = {
    vus,
    testRunDurationMs,
    count: warm.count,
    avg: warm.avg,
    min: warm.min,
    med: warm.med,
    max: warm.max,
    ['p(90)']: warm['p(90)'],
    ['p(95)']: warm['p(95)'],
    ['p(99)']: warm['p(99)'],
    ['p(99.99)']: warm['p(99.99)']
  }

  return {
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
    [`./summaries/${__ENV.DATE}/${__ENV.NAME}/cold.json`]:
      JSON.stringify(coldObj),
    [`./summaries/${__ENV.DATE}/${__ENV.NAME}/warm.json`]:
      JSON.stringify(warmObj),
    [`./summaries/${__ENV.DATE}/${__ENV.NAME}/summary.html`]: htmlReport(data)
  }
}
