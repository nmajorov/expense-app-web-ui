#!/usr/bin/env bash

echo "delete existing ui pipeline first "
CUR_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
oc delete pipelineresources.tekton.dev  expenses-web-ui-git ui-image --ignore-not-found=true
oc delete pipelineresources.tekton.dev  expenses-web-ui-$CUR_BRANCH-git ui-image --ignore-not-found=true

oc delete tasks deploy-nodejs-app test-nodejs-app --ignore-not-found=true

oc delete pipelines.tekton.dev build-expenses-web-ui --ignore-not-found=true

echo "deploy resources"
oc create -f resources/

echo "deploy tasks"
oc create -f tasks/

echo "deploy pipeline"
oc create -f pipeline.yaml

