IMAGE_NAME = centos/nodejs-12-centos7
CONTAINER_ENGINE := $(shell command -v podman 2> /dev/null | echo docker)

build:
	${CONTAINER_ENGINE} build -t $(IMAGE_NAME) .

.PHONY: test
test:
	${CONTAINER_ENGINE} build -t $(IMAGE_NAME)-candidate .
	IMAGE_NAME=$(IMAGE_NAME)-candidate test/run

