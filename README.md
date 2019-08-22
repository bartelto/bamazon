# Bamazon

*Bamazon* is an Amazon-like storefront constructed using Node.js and MySQL.

## Introduction

*Bamazon* simulates most of the functions of an online storefront:
- ```bamazonCustomer.js``` is a customer portal that displays products for sale and allows the use to make "purchases".
- ```bamazonManager.js``` is a manager portal that can display all products within the store or just those with low inventory (5 or fewer units). It also allows a manager to add units to inventory or add completely new products.
- ```bamazonSupervisor.js``` is a supervisor view that allows a supervisor to see the total sales, total overhead, and net profit for different product departments. It also has an option for adding new departments.

## Using *Bamazon*

*Bamazon* is a **Node.js** application. Follow these steps to run it:
- Download the project from GitHub to your local machine.
- Use a command-line interface (CLI) to navigate inside the project directory.
- Type ```npm install``` to install modules needed for the project.
- Type ```node bamazonCustomer.js``` to open the customer portal, ```node bamazonManager.js``` to open the manager portal, or ```node bamazonSupervisor.js``` to open the supervisor portal.

*Mystery Inventor* will randomly choose the name of a famous inventor, display the name with the letters represented by blanks, and then prompt the user to guess a letter. If the name contains the chosen letter one or more times, the program will reveal it/them. If not, the number of remaining incorrect guesses will decrease by one. Be careful! If you make 10 incorrect guesses, you lose!

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