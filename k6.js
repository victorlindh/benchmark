import http from 'k6/http'
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js'

export const options = {
  iterations: 10000000,
  //duration: '10s',
  vus: 500
}

export default function () {
  http.get(`http://localhost:${__ENV.PORT}`)
}

export function handleSummary(data) {
  const n = data.metrics.http_reqs.values.count
  const vu = data.metrics.vus.values.value
  const time = data.state.testRunDurationMs
  const avg = data.metrics.http_req_duration.values.avg
  const p95 = data.metrics.http_req_duration.values['p(95)']

  const simple = {
    n,
    vu,
    time,
    avg,
    p95
  }

  return {
    [`./summaries/${__ENV.NAME}/simpleSummary.json`]: JSON.stringify(simple),
    [`./summaries/${__ENV.NAME}/summary.json`]: JSON.stringify(data),
    [`./summaries/${__ENV.NAME}/summary.html`]: htmlReport(data)
  }
}
