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
    console.log("Welcome to Bamazon!".yellow + "\nConnected as id " + connection.threadId + "\n");
    showProducts();
});

function showProducts() {
    connection.query(
        "SELECT * FROM products ORDER BY department_name",
        function(err, res) {
            if (err) throw err;
            console.log(`${"ID".padEnd(2,' ')}  ${"PRODUCT NAME".padEnd(25,' ')} ${"DEPARTMENT".padEnd(20,' ')}   ${"PRICE".padStart(6,' ')} ${"QTY".padStart(8,' ')}`.blue);
            console.log("".padEnd(68,"-").bold);
            res.forEach(function(row){
                console.log(`${row.item_id.toString().padStart(2,' ')}  ${row.product_name.padEnd(25,' ')} ${row.department_name.padEnd(20,' ')} $ ${row.price.toFixed(2).padStart(6,' ')} ${row.stock_quantity.toString().padStart(8,' ')}`);
            });
            console.log('\n');
            
            inquirer.prompt([
                {
                    name: "id",
                    message: "Enter the ID of the product you would like to purchase:",
                    type: "number"
                },
                {
                    name: "qty",
                    message: "Enter the quantity:",
                    type: "number",
                    validate: function(val) {
                        if (val < 1) {
                            return "Please enter a positive quantity.";
                        } else return true;
                    }
                }
            ]).then(function(response) {
                // check if the store has sufficient stock
                connection.query(
                    "SELECT * FROM products WHERE item_id = ?", [response.id],
                    function(err, res) {
                        if (err) throw err;
                        //console.log(res);
                        if (res[0].stock_quantity < response.qty) {
                            if (res[0].stock_quantity <= 0) {
                                console.log(`\nSorry, but that item is out of stock.\n`.yellow);
                            } else {
                                console.log(`\nSorry, but there are only ${res[0].stock_quantity.toString().yellow} items available.\n`);
                            }
                            continueOrExit();
                        } else { // sufficient qty in stock
                            connection.query(
                                "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?", [response.qty, response.id],
                                function(err) {
                                    if (err) throw err;
                                    console.log("\nThank you for your purchase!".green + 
                                        `\nItem ${res[0].item_id} - ${res[0].product_name} - qty. ${response.qty}` +
                                        `\nUnit cost:  $ ${res[0].price.toFixed(2).padStart(6)}` +
                                        `\nTotal cost: $ ${(response.qty * res[0].price).toFixed(2).padStart(6)}\n`
                                    );
                                    continueOrExit();
                                }
                            );
                        }
                    }
                );
            });
        }
    );
}

function continueOrExit() {
    inquirer.prompt(
        {
            name: "continue",
            message: "Continue shopping? Press enter to continue, or type 'n' to exit.)",
            type: "confirm"
        }
    ).then(function(response) {
        if (response.continue) { 
            console.log("\n"); 
            showProducts(); 
        }
        else connection.end();
    });
}
