require("dotenv").config();

let keys = require("../keys.js");
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

function showOptions() {
    inquirer.prompt(
        {
            type: 'list',
            name: "command",
            message: "Choose an action:",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit" ]
        }
    ).then(function(response) {
        switch (response.command) {
           
            case "View Products for Sale":
                
                break;
        
            
            case "View Low Inventory":
                
                break;

               
            case "Add to Inventory":
                
                break;

        
            case "Add New Product":
                
                break;

            // Exit 
            case "Exit":
                connection.end();
                break;

            default:
                console.log("Command not recognized.");
                showOptions();
                break;
        }
    });
    
}
