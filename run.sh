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
export loggly_token=5111d89f-dde5-4214-9e1e-00de70939e44
nodemon app.js &

cd ..
cd api-gateway
echo "Running the api gateway"
pwd
rm -f package-lock.json
npm install
export loggly_token=5111d89f-dde5-4214-9e1e-00de70939e44
nodemon app.js

echo "Done"
