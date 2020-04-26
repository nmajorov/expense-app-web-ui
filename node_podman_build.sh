#!/bin/env bash

echo "build using podman "

TAG="latest"
CONTAINER="docker.io/library/node:$TAG"

echo "node version : " $(podman  run --rm  -v "$PWD":/home/node/app:Z -w /home/node/app $CONTAINER  node --version)
podman  run --rm  -v "$PWD":/home/node/app:Z -w /home/node/app $CONTAINER  yarn test


