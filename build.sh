#!/bin/bash

api="agritech.api"
user="burgos"


path="~/${api}/"

echo 'compiling server files locally'
yarn build

echo 'deleting server files'
ssh ${user}@agencyboz "source ~/.nvm/nvm.sh; cd ${path}; rm -rf dist node_modules prisma"

echo 'Uploading build to server'
scp -r dist ${user}@agencyboz:${path}/

echo 'uploading templates'
ssh ${user}@agencyboz "mkdir -p ${user}@agencyboz:${path}/src"
scp -r src/templates/ ${user}@agencyboz:${path}/src

echo 'uploading .env to server'
scp .env ${user}@agencyboz:${path}/

echo 'uploading package.json to server'
scp package.json ${user}@agencyboz:${path}/

echo 'syncing dependencies'
ssh ${user}@agencyboz "source ~/.nvm/nvm.sh; cd ${path}; yarn install --production"

echo 'Uploading prisma to server'
scp -r prisma ${user}@agencyboz:${path}/

echo 'generating prisma client'
ssh ${user}@agencyboz "source ~/.nvm/nvm.sh; cd ${path}; npx prisma generate"

echo 'restarting server api'
ssh ${user}@agencyboz "source ~/.nvm/nvm.sh; cd ${path}; pm2 restart ${api}"

echo 'finished'
