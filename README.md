# RESTful-Blog-App

<img src="images/index.png">

This blog application was created for demonstrating RESTful routing principles. Blogs can be created, read, updated, and destroyed through the usual RESTful routes. Semantic UI was used for the front-end while MongoDb, Express, and Node.js were used for the backend.

## Requirements

Ensure you have <a href="https://docs.mongodb.com/manual/installation/" target="_blank">MongoDb</a> and <a href="https://nodejs.org/" target="_blank">Node.js</a> installed.

## Unix Setup

1. Start Bash and cd to your MongoDB bin directory. Start the MongoDb database on port 27017 with the following command.
```bash
mongod --port 27017
```
2. Change directory to the project folder and install dependencies
```bash
cd <projectFolder>
npm install
```
3. In the same project directory, start the application
```bash
RESTFULBLOGDB=mongodb://localhost:27017/restfulblog node app.js
```
4. The application is set to listen for http requests on port 3000 by default. Open your web browser and go to http://localhost:3000/. You should see the blog application in your browser.

## Windows Setup

1. Open the Command Prompt and cd to your MongoDB bin directory. Start the MongoDb database on port 27017 with the following command.
```bash
mongod --port 27017
```
2. Change directory to the project folder and install dependencies
```bash
cd <projectFolder>
npm install
```
3. In the same project directory, start the application
```bash
set RESTFULBLOGDB=mongodb://localhost:27017/restfulblog&&node app.js
```
4. The application is set to listen for http requests on port 3000 by default. Open your web browser and go to http://localhost:3000/. You should see the blog application in your browser.

## Features

<img src="images/new.png">

This application can create, read, update, and destroy simple blog entries consisting of a title, image url, blog body, and time stamp. It communicates with a MongoDb database, and uses RESTful routing to achieve its CRUD functionality. For example, when the submit button of the New Blog page shown above is clicked, a POST request with the inputted blog data is sent via the create route, and a new blog is added to the database. The website subsequently redirects back to the index path.
