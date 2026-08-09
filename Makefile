# Needed SHELL since I'm using zsh
SHELL = /usr/bin/bash

# get Makefile directory name: http://stackoverflow.com/a/5982798/376773
THIS_MAKEFILE_PATH:=$(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))
THIS_DIR:=$(shell cd $(dir $(THIS_MAKEFILE_PATH));pwd)

# docker image name
IMAGE_NAME = majorov.biz/expenses-ui

# app version, read from deno.json
VERSION := $(shell grep -m1 '"version"' deno.json | sed -E 's/.*"version"[[:space:]]*:[[:space:]]*"([^"]+)".*/\1/')

PODMAN_CHECK=command -v podman
CONTAINER_ENGINE := $(shell if [ -z $$(command -v podman) ];then echo docker;else echo podman; fi )

ts := $(shell date -u +"%Y-%m-%dT%H:%M:%SZ")


.PHONY: help
help: ## This help message
		@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/\\x1b[36m\1\\x1b[m:\2/')"



all: help


.PHONY: lint
lint: ##  run elint on code
	@echo "elint code "
	deno lint


.PHONY: dev
dev: ##  run gui in dev mode
	@echo "run	app"
	deno run --allow-net --allow-read dev


.PHONY: dep
dep: ##  run gui in dev mode for node-js version  <17
	@echo "install dependencies"
	deno install --allow-scripts

.PHONY: status
status: ##  run gui in dev mode for node-js version  <17
	@echo "dep status dependencies"
	deno outdated

.PHONY: version
version: ## show current app version
	@echo $(VERSION)

# check dependencies list
# deno info  client/src/main.tsx




.PHONY: test

test: ##	run tests
		@echo "run tests"
		deno test -A

.PHONY: build
build: ##  build everything
		@echo "run js build"
		deno run  build

.PHONY: docker
docker: clean ## build with container
	@echo $(CONTAINER_ENGINE)
	${CONTAINER_ENGINE} build -t $(IMAGE_NAME):$(VERSION) .
	


docker-run: ## run locally app in  docker
	 @echo run container on port 3000
	 #${CONTAINER_ENGINE} run -it --rm -p3000:8080 $(IMAGE_NAME)



.PHONY: test-container
test-container: ## test with container
	#${CONTAINER_ENGINE} build -t $(IMAGE_NAME)-candidate:$(VERSION) .
	 #IMAGE_NAME=$(IMAGE_NAME)-candidate test/run


.PHONY: clean
clean: ## clean
	 @echo "run cleaning"
	 @if [ -d $(THIS_DIR)/client/dist ] ;then \
	 	rm -r $(THIS_DIR)/client/dist ;\
	 fi

	 @if [ -d $(THIS_DIR)/client/.vite ] ;then \
	 	rm -r $(THIS_DIR)/client/.vite ;\
	 fi

	 @if [ -d $(THIS_DIR)/node_modules ] ;then \
	 	rm -r $(THIS_DIR)/node_modules ;\
	 fi

	deno clean

###################
# Unit/CI Testing #
###################
#unit: verify
#	@echo "go test SDK and vendor packages"
#	go test -tags ${UNIT_TEST_TAGS} ${SDK_ALL_PKGS}

#unit-with-race-cover: verify
#	@echo "go test SDK and vendor packages"
#	go test -tags ${UNIT_TEST_TAGS} -race -cpu=1,2,4 ${SDK_ALL_PKGS}
