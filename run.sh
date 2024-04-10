#!/usr/bin/env bash

echo "Start All applications"
cd package-service
echo "Running the Package Service"
pwd
rm -f package-lock.json
npm install
export jwt_private_key=5111d89f-dde5
export loggly_token=5111d89f-dde5-4214-9e1e-00de70939e44
export amqp_password="46"
export db_connection_url=mongodb://localhost:27017/superapp
nodemon app.js &

cd ..
cd delivery-service
echo "Running the Delivery Service"
pwd
rm -f package-lock.json
npm install
export jwt_private_key=5111d89f-dde5
export loggly_token=5111d89f-dde5-4214-9e1e-00de70939e44
export amqp_password="54"
export db_connection_url=mongodb://localhost:27017/superapp
nodemon app.js &

cd ..
cd user-service
echo "Running the User Service"
pwd
rm -f package-lock.json
npm install
export jwt_private_key=5111d89f-dde5
export  bcrypt_salt=10
export loggly_token=5111d89f-dde5-4214-9e1e-00de70939e44
export db_connection_url=mongodb://localhost:27017/superapp
nodemon app.js &


cd ..
cd web
echo "Running the web"
pwd
rm -f package-lock.json
npm install
npm start &

cd ..
cd api-gateway
echo "Running the api gateway"
pwd
rm -f package-lock.json
npm install
export loggly_token=5111d89f-dde5-4214-9e1e-00de70939e44
nodemon app.js

echo "Done"
