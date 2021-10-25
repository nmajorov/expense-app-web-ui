#!/usr/bin/env zsh
oc extract secret/router-certs-default --to=/tmp -n openshift-ingress

oc create route edge secure-ui --service nodejs-gui  --key /tmp/tls.key --cert /tmp/tls.crt


