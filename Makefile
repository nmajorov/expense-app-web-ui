# Needed SHELL since I'm using zsh
SHELL := /bin/bash

IMAGE_NAME = centos/nodejs-12-centos7
CONTAINER_ENGINE := $(shell command -v podman 2> /dev/null | echo docker)

ts := $(shell date -u +"%Y-%m-%dT%H:%M:%SZ")


.PHONY: help
help: ## This help message
		@echo -e "$$(grep -hE '^\S+:.*##' $(MAKEFILE_LIST) | sed -e 's/:.*##\s*/:/' -e 's/^\(.\+\):\(.*\)/\\x1b[36m\1\\x1b[m:\2/')"


#.PHONY: status
#status: ## check dependencies status
#	dep status

all: help


.PHONY: run
run: ##  run gui in dev mode
	@echo "run	app"
	$(shell yarn start)


.PHONY: test
test: ##	run tests
		@echo "run tests"
		$(shell yarn test)

.PHONY: build
build: ##  build everything
		@echo "run js build"
		$(shell yarn build)

.PHONY: build-container
build-container: ## build with container
		${CONTAINER_ENGINE} build -t $(IMAGE_NAME) .


.PHONY: test-container
test-container: ## test with container
	 #${CONTAINER_ENGINE} build -t $(IMAGE_NAME)-candidate .
	# IMAGE_NAME=$(IMAGE_NAME)-candidate test/run


.PHONY: clean
clean: ## clean
	 @echo "clean"

###################
# Unit/CI Testing #
###################
#unit: verify
#	@echo "go test SDK and vendor packages"
#	go test -tags ${UNIT_TEST_TAGS} ${SDK_ALL_PKGS}

#unit-with-race-cover: verify
#	@echo "go test SDK and vendor packages"
#	go test -tags ${UNIT_TEST_TAGS} -race -cpu=1,2,4 ${SDK_ALL_PKGS}
