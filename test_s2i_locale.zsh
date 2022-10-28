#!/usr/bin/env zsh

NGINX_IMAGE="quay.io/sclorg/nginx-118-c8s:c8s"
s2i build ./build $NGINX_IMAGE  --as-dockerfile Dockerfile.gen