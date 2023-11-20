#!/bin/bash

api="agritech.api"
user="burgos"

path="~/${api}/"

echo 'compiling server filies locally'
yarn build

echo 'Uploading build to server'
scp -r dist/* ${user}@agencyboz:${path}/dist/

echo 'restarting server api'
ssh ${user}@agencyboz "source ~/.nvm/nvm.sh; pm2 restart ${api}"
