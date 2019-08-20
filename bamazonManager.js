require("dotenv").config();

let keys = require("./keys.js");
let mysql = require('mysql');
let colors = require('colors');
let inquirer = require('inquirer');

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: keys.mysql.password,
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Bamazon Management Portal".yellow + "\nConnected as id " + connection.threadId + "\n");
    showOptions();
});

showOptions() {

}
