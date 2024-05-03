# Package Tracker App

The Package Tracker App is a system that allows users to track their packages through various delivery services. It consists of several microservices including the Delivery Service, Package Service, User Service, API Gateway, Common Library and a web app

## Services

### Delivery Service

The Delivery Service is responsible for managing the delivery process of packages. It provides functionality such as tracking package status, updating package location, and notifying users about package updates.

### Package Service

The Package Service handles the management of packages within the system. It allows users to create new packages, retrieve package information, and update package details.

### User Service

The User Service is responsible for managing user-related functionality. It handles user registration, authentication, and authorization. Additionally, it stores user information and manages user preferences.

### API Gateway

The API Gateway acts as the entry point for client applications to access the Package Tracker App. It provides a unified interface for all the services and handles request routing, load balancing, and authentication.

### Common Library

The Common Library is a shared library that contains common functionalities, utilities, and models used by multiple services within the Package Tracker App. It promotes code reusability and consistency across the system.

## Web
  The web application is bult on angular 17

## Installation && configuration

To install and run the Package Tracker App, follow these steps:

1. Clone the repository: `https://github.com/ewangclarkson/package-tracker.git`
2. Run the application
   - cd package-tracker,make the run.sh file executable
   - run docker compose up

Make sure you have Node.js, npm and docker installed on your system


## Usage

Once the services are up and running, you can interact with the Package Tracker App through the API Gateway through http://localhost:8000.


## License

The Package Tracker App is licensed under the [GOZEM License](GOZEM).
