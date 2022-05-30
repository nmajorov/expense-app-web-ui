#!/usr/bin/env bash

PROJECT=$(oc  project -q)

DIRNAME=`dirname "$0"`

echo "run as cluster admin !!!"

echo "allow pipeline use anyuid"
echo 
echo "list service accounts"
oc get sa

echo 
echo "add scc to sa pipeline"
oc adm policy add-scc-to-user  privileged -z pipeline


echo 
echo "whom can use scc privileged: "

oc adm policy who-can use scc anyuid | grep system:serviceaccount:$PROJECT:pipeline
