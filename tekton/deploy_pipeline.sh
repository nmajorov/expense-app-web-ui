#!/usr/bin/env bash

echo "delete existing tasks first "
#CUR_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
oc delete pipelineresources.tekton.dev  expenses-web-ui-git ui-image --ignore-not-found=true
oc delete tasks.tekton.dev build-nodejs-app  --ignore-not-found=true
oc delete tasks.tekton.dev test-nodejs-app --ignore-not-found=true
oc delete tasks.tekton.dev webapp-build-runtime --ignore-not-found=true
oc delete tasks.tekton.dev deploy-nodejs-app --ignore-not-found=true
echo "delete pipeline"
oc delete pipelines.tekton.dev build-expenses-web-ui --ignore-not-found=true

echo
echo

echo "deploy resources"
oc create -f resources/

echo "deploy tasks"
oc create -f tasks/

echo "deploy pipeline"
oc create -f pipeline.yaml

