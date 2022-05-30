#!/usr/bin/env bash

PROJECT=$(oc  project -q)

DIRNAME=`dirname "$0"`

echo "run as cluster admin !!!"

echo "allow pipeline use anyuid"
echo 
echo "list service accounts"
oc get sa

echo 
echo "add scc anyuid to user pipeline"
oc adm policy add-scc-to-user anyuid -z pipeline


echo 
echo "list anyuid for sa pipeline"
oc adm policy who-can use scc anyuid | grep system:serviceaccount:$PROJECT:pipeline
