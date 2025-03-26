import http from 'k6/http'
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
  iterations: 10000,
  vus: 100
}
export default function () {
  http.get('http://localhost:3000')
}
