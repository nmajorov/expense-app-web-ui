# Needed SHELL since I'm using zsh
SHELL = /usr/bin/bash

# get Makefile directory name: http://stackoverflow.com/a/5982798/376773
THIS_MAKEFILE_PATH:=$(word $(words $(MAKEFILE_LIST)),$(MAKEFILE_LIST))
THIS_DIR:=$(shell cd $(dir $(THIS_MAKEFILE_PATH));pwd)

# docker image name
IMAGE_NAME = majorov.biz/expenses-ui

PODMAN_CHECK=command -v podman
CONTAINER_ENGINE := $(shell if [ -z $$(command -v podman) ];then echo docker;else echo podman; fi )

ts := $(shell date -u +"%Y-%m-%dT%H:%M:%SZ")


.PHONY: help
help: ## This help message
		@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/\\x1b[36m\1\\x1b[m:\2/')"


.PHONY: status
status: ## check dependencies status
	yarn install --check-files

all: help


.PHONY: lint
lint: ##  run elint on code
	@echo "elint code "
	yarn lint


.PHONY: run
run: ##  run gui in dev mode
	@echo "run	app"

	deno run dev


.PHONY: test

test: ##	run tests
		@echo "run tests"
		deno test -A

.PHONY: build
build: ##  build everything
		@echo "run js build"
		unset REACT_APP_KEYCLOAK_URL
		unset REACT_APP_KEYCLOAK_REALM
		unset REACT_APP_KEYCLOAK_CLIENT_ID
		unset REACT_APP_BACKEND_URL
		deno run  build

.PHONY: docker
docker: clean ## build with container
	@echo $(CONTAINER_ENGINE)
	# back up real production file
	#mv .env.production .env.back_up
	#mv .env.docker .env.local
	#yarn build
	#mv .env.local .env.docker
	#mv .env.back_up .env.production
	#${CONTAINER_ENGINE} build -t $(IMAGE_NAME) .


docker-run: ## run locally app in  docker
	 @echo run container on port 3000
	 #${CONTAINER_ENGINE} run -it --rm -p3000:8080 $(IMAGE_NAME)



.PHONY: test-container
test-container: ## test with container
	#${CONTAINER_ENGINE} build -t $(IMAGE_NAME)-candidate .
	 #IMAGE_NAME=$(IMAGE_NAME)-candidate test/run


.PHONY: clean
clean: ## clean
	 @echo "run cleaning"
	 @if [ -d $(THIS_DIR)/build ] ;then \
	 	rm -r $(THIS_DIR)/build ;\
	 fi

###################
# Unit/CI Testing #
###################
#unit: verify
#	@echo "go test SDK and vendor packages"
#	go test -tags ${UNIT_TEST_TAGS} ${SDK_ALL_PKGS}

#unit-with-race-cover: verify
#	@echo "go test SDK and vendor packages"
#	go test -tags ${UNIT_TEST_TAGS} -race -cpu=1,2,4 ${SDK_ALL_PKGS}
