#!/bin/env bash
BRANCH="keycloak"
ROUTE_HOST=$(oc get route node-app-pipeline-route --template='http://{{.spec.host}}')
echo "route $ROUTE_HOST"
REPO_URL="https://github.com/nmajorov/expenses-web-ui.git"

curl -v  -H 'X-GitHub-Event: pull_request' \
	  -H 'Content-Type: application/json' \
	-d '{ "repository": {"clone_url": "${REPO_URL}"}, "pull_request": {"head": {"sha": "${BRANCH}"}}}' \
			     ${ROUTE_HOST}
