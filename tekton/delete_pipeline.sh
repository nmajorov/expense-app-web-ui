#!/usr/bin/env bash

echo "delete ui route"

oc delete pipelineresources.tekton.dev  expenses-web-ui-git 

oc delete tasks deploy-nodejs-app test-nodejs-app

oc delete pipelines.tekton.dev build-expenses-web-ui


oc create -f git-resource.yaml 
oc create -f image-resource.yaml

oc create -f tasks/


oc create -f pipeline.yaml

