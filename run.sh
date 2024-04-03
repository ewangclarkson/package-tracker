#!/usr/bin/env bash

echo "Start All applications"
cd package-service
echo "Running the Package Service"
pwd
rm -f package-lock.json
npm install
nodemon app.js &

cd ..
cd delivery-service
echo "Running the Delivery Service"
pwd
rm -f package-lock.json
npm install
nodemon app.js &


cd ..
cd api-gateway
echo "Running the api gateway"
pwd
rm -f package-lock.json
npm install
nodemon app.js

echo "Done"
