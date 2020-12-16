#!/usr/bin/bash

echo "emulate react app call to keycloak"

USER_NAME=niko
PASSWORD=niko
SSO_URL="http://sso-test-nm-demo.apps.ocp-cluster-1.rhlab.ch/auth/realms/basic/protocol/openid-connect/token"
BACKEND_URL="http://expenses-backend-quarkus-nm-demo.apps.ocp-cluster-1.rhlab.ch"

export access_token=$(\

    curl -v  -X POST "$SSO_URL" \
    -H 'content-type: application/x-www-form-urlencoded' \
    -d "grant_type=password&username=$USER_NAME&password=$PASSWORD&client_id=app-react" | jq --raw-output '.access_token' \
)

echo "access_token: $access_token"

curl -v -X GET $BACKEND_URL/reports -H "Authorization: Bearer "$access_token

exit 0

curl -v -X GET \
  http://localhost:8080/reports \
  -H "Authorization: Bearer "$access_token


