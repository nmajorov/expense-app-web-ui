#!/usr/bin/env bash


echo "run keycloak server"

DIRNAME=`dirname "$0"`


if [ -z "$1" ]
  then
    echo "No POD name as argument run standalone with internal database"
    podman run --rm  -p 7080:8080  --security-opt label=disable  -e KEYCLOAK_USER=admin \
    -e KEYCLOAK_PASSWORD=admin \
    -e KEYCLOAK_IMPORT=/tmp/geektour-realm.json  -v $DIRNAME/keycloak-conf/geektour-realm.json:/tmp/geektour-realm.json \
    docker.io/jboss/keycloak
 else 
    echo "pod name is to join  is $1"
    # run command to join the pod with mysql database
    POD="$1"
    podman run -dt --pod $POD --security-opt label=disable \
     -e KEYCLOAK_USER=admin \
     -e KEYCLOAK_PASSWORD=admin \
     -e KEYCLOAK_IMPORT=/tmp/geektour-realm.json  -v $DIRNAME/keycloak-conf/geektour-realm.json:/tmp/geektour-realm.json \
     -e DB_PORT="3306" \
     -e DB_VENDOR="mysql" \
     -e DB_USER="sso" \
     -e DB_PASSWORD="sso" \
     -e DB_ADDR=$POD \
     -e DB_DATABASE="sso" \
    docker.io/jboss/keycloak
fi

    
#    sudo podman run -dt --pod $POD  -e SSO_ADMIN_USERNAME=admin \
#    -e SSO_ADMIN_PASSWORD=admin \
#    -e SCRIPT_DEBUG=true \
#    -e X509_CA_BUNDLE="/var/run/secrets/kubernetes.io/serviceaccount/service-ca.crt" \
#  -e DB_SERVICE_PREFIX_MAPPING="$POD-postgresql=DB" \
#  -e DB_USERNAME="sso" \
#  -e DB_PASSWORD="sso" \
#  -e SSO73_POSTGRESQL_SERVICE_HOST=$POD \
#  -e DB_DATABASE="db" \
#  -e SSO73_POSTGRESQL_SERVICE_PORT=5432 \
#  -e DB_JNDI="java:jboss/datasources/KeycloakDS" \
# registry.access.redhat.com/redhat-sso-7/sso73-openshift
