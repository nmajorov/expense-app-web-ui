#!/usr/bin/env bash

PROJECT=$(oc  project -q)                                                                                                                                         
                                                                                                                                                                  
DIRNAME=`dirname "$0"`

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
cat "$DIRNAME/resources/image-resource.yaml" | sed -e "s/nm-demo/$PROJECT/g" | oc create -f -                                                                     


oc apply -f "$DIRNAME/resources/git-resource.yaml"
oc apply -f "$DIRNAME/resources/pvc-workspace.yaml"

echo "deploy tasks"
oc create -f tasks/

echo "deploy pipeline"
oc create -f pipeline.yaml

