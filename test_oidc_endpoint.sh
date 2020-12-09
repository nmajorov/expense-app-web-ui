#!/usr/bin/bash

echo "emulate react app call to keycloak"

USER_NAME=niko
PASSWORD=niko

export access_token=$(\

    curl -v  -X POST "http://localhost:7080/auth/realms/basic/protocol/openid-connect/token" \
    -H 'content-type: application/x-www-form-urlencoded' \
    -d "grant_type=password&username=$USER_NAME&password=$PASSWORD&client_id=app-react" | jq --raw-output '.access_token' \
)

echo "access_token: $access_token"

curl -v -X GET http://localhost:3000/api/reports -H "Authorization: Bearer "$access_token

exit 0

curl -v -X GET \
  http://localhost:8080/reports \
  -H "Authorization: Bearer "$access_token


