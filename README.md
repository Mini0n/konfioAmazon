# README

## Architecture:

* Back-end/API: Node v6.9.0 (with npm 5.4.2)
* Information CRUD in MySQL
* Front served from /front folder [Vanilla JS + jQuery and Bootstrap 4]

## Configuration and Installation:


### Node & NPM
  If you don't have Node and npm already in your system please refer to the [Node site](https://nodejs.org) where packages/installers are available for almost any OS.
  Node comes with so you're covered. If you want to update it you can run `npm install npm@latest -g` from a terminal.
  To check your Node and npm version use: `node -v` and `npm -v`

### Database
  Database is MySQL 14.14.
  Easiest way to install it and configure is by installing LAMP, WAMP or MAMP (Linux/Mac/Windows Apache+MySQL+PHP)
  Installers by bitnami can be found [here](https://bitnami.com/stacks/infrastructure).
  phpMyAdmin is a great tool to manager your DBs. You can find it [here](https://www.phpmyadmin.net/)

### Configuration
  Now with Node and npm go to the *root* folder of the project and run `npm install` from your terminal.
  This will resolve all the needed dependencies ([Express](https://expressjs.com/) for the serving and [amazon-product-api](https://www.npmjs.com/package/amazon-product-api) for the Amazon Product API use)

### Database creation
  You will need to create a DB called **Konfio**. You can do it easily with phpMyAdmin (see Database) or with any MySQL Manager tool you'll prefer.

### Database initialization
  With the **Konfio** DB created and Node and npm in the system this is really easy.
  In the *config* folder of the project you'll find the *createDB.js* file. Edit it to set your MySQL username and password and save it.
  Then from your terminal run: `node createDB.js`.
  All done!

### Running application
  And now we're ready.
  To run the app just go to the *root* folder of the project and from your terminal run: `node index.js`.
  Information on the screen will let you know the app is running.
  Now just go to: **http://localhost:8000** in your browser and voilà.
