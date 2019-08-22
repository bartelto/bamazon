# Bamazon

*Bamazon* is an Amazon-like storefront constructed using Node.js and MySQL.

## Introduction

*Bamazon* simulates most of the functions of an online storefront using three separate apps:
- ```bamazonCustomer.js``` is a customer portal that displays products for sale and allows the use to make "purchases".
- ```bamazonManager.js``` is a manager portal that can display all products within the store or just those with low inventory (5 or fewer units). It also allows a manager to add units to inventory or add completely new products.
- ```bamazonSupervisor.js``` is a supervisor view that allows a supervisor to see the total sales, total overhead, and net profit for different product departments. It also has an option for adding new departments.

## Using *Bamazon*

*Bamazon* is a **Node.js** application. Follow these steps to run it:
- Install [Node.js](https://nodejs.org/en/download/) and [MySQL](https://www.mysql.com/downloads/).
- Download the project from GitHub to your local machine.
- Open MySQL and use the files in ```/sql``` to create the needed database tables (```products-schema.sql``` and ```departments-schema.sql```) and (optionally) to seed the tables with some data (```products-seed.sql``` and ```departments-seed.sql```).
- Use a command-line interface (CLI) to navigate inside the project directory. 
- Create a file in the root directory called ```keys.js``` and give it the following contents:
```
exports.mysql = {
  password: process.env.MYSQL_PASSWORD
};
```
- Create another file in the root directory called ```.env``` and give it the following contents:
```
# MySQL password
MYSQL_PASSWORD=YOUR-PASSWORD-HERE
```
- The three portals reside in the ```\customer```, ```\manager```, and ```\supervisor``` directories. To run any of the portal applications:
    - Type ```npm install``` to install modules needed for the app.
    - Type ```node bamazon__________.js``` (see the complete filenames above) to run the portal.

## Demo

The functionality of all three *Bamazon* portals is demonstrated briefly in this video:
https://www.youtube.com/watch?v=RVo-sRbADms

## NPM packages used
- **```colors```** Allows some basic styling and coloring of text in the console.
- **```inquirer```** A collection of common, interactive command-line user interfaces.
- **```mysql```** A driver for connecting to MySQL databases.
- **```table```** Produces a string that represents array data in a text table.

## The author

This app was written from the ground up by **Todd F. Bartelt** as part of the Full-Stack Web Development program at University of Kansas Professional and Continuing Education. Learn more about Todd at [toddbartelt.com](http://toddbartelt.com).