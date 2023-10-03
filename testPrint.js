const date = process.env.DATE

const nodeCold = require(`./summaries/${date}/node/cold.json`)
const nodeWarm = require(`./summaries/${date}/node/warm.json`)
const nodeDockerCold = require(`./summaries/${date}/node_docker/cold.json`)
const nodeDockerWarm = require(`./summaries/${date}/node_docker/warm.json`)

const denoCold = require(`./summaries/${date}/deno/cold.json`)
const denoWarm = require(`./summaries/${date}/deno/warm.json`)
const denoDockerCold = require(`./summaries/${date}/deno_docker/cold.json`)
const denoDockerWarm = require(`./summaries/${date}/deno_docker/warm.json`)

const bunCold = require(`./summaries/${date}/bun/cold.json`)
const bunWarm = require(`./summaries/${date}/bun/warm.json`)
const bunDockerCold = require(`./summaries/${date}/bun_docker/cold.json`)
const bunDockerWarm = require(`./summaries/${date}/bun_docker/warm.json`)

const table = {
  'node cold': nodeCold,
  'node warm': nodeWarm,
  'node docker cold': nodeDockerCold,
  'node docker warm': nodeDockerWarm,
  'deno cold': denoCold,
  'deno warm': denoWarm,
  'deno docker cold': denoDockerCold,
  'deno docker warm': denoDockerWarm,
  'bun cold': bunCold,
  'bun warm': bunWarm,
  'bun docker cold': bunDockerCold,
  'bun docker warm': bunDockerWarm
}

console.table(table)
