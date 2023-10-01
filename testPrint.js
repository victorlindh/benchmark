const nodeSummary = require('./summaries/node/simpleSummary.json')
const denoSummary = require('./summaries/deno/simpleSummary.json')
const bunSummary = require('./summaries/bun/simpleSummary.json')

const nodeDockerSummary = require('./summaries/node_docker/simpleSummary.json')
const denoDockerSummary = require('./summaries/deno_docker/simpleSummary.json')
const bunDockerSummary = require('./summaries/bun_docker/simpleSummary.json')

const table = {
  node: nodeSummary,
  'docker node': nodeDockerSummary,
  deno: denoSummary,
  'docker deno': denoDockerSummary,
  bun: bunSummary,
  'docker bun': bunDockerSummary
}

console.table(table)
