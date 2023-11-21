import http from 'k6/http'
export const options = {
  iterations: 10000000,
  vus: 100
}
export default function () {
  http.get('http://localhost:3000')
}
