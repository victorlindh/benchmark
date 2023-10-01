#!/bin/bash
trap "exit" INT TERM ERR
trap "kill 0" EXIT

PORT=3000
DOCKER_BIND=127.0.0.1:$PORT:$PORT
SLEEP_TIME=3


docker build -t node-server ./node
docker run --name node_container --env PORT=$PORT -dp $DOCKER_BIND node-server
sleep $SLEEP_TIME
k6 run k6.js --env PORT=$PORT --env NAME=node_docker
docker rm -f node_container

docker build -t deno-server ./deno
docker run --name deno_container --env PORT=$PORT -dp $DOCKER_BIND deno-server
sleep $SLEEP_TIME
k6 run k6.js --env PORT=$PORT --env NAME=deno_docker
docker rm -f deno_container

docker build -t bun-server ./bun
docker run --name bun_container --env PORT=$PORT -dp $DOCKER_BIND bun-server
sleep $SLEEP_TIME
k6 run k6.js --env PORT=$PORT --env NAME=bun_docker
docker rm -f bun_container


PORT=$PORT node ./node/node.js & 
sleep $SLEEP_TIME
k6 run k6.js --env PORT=$PORT --env NAME=node
kill %1

PORT=$PORT deno run --allow-net --allow-env ./deno/deno.js &
sleep $SLEEP_TIME
k6 run k6.js --env PORT=$PORT --env NAME=deno
kill %2

PORT=$PORT bun run ./bun/bun.js &
sleep $SLEEP_TIME
k6 run k6.js --env PORT=$PORT --env NAME=bun
kill %3





echo "All tests completed, summaries updated. Printing simple results;"
node testPrint.js
