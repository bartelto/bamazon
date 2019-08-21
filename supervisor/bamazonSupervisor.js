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
    console.log("Bamazon Supervisor Portal".cyan + "\nConnected as id " + connection.threadId + "\n");
    showOptions();
});

function showOptions() {
    inquirer.prompt(
        {
            type: 'list',
            name: "command",
            message: "Choose an action:",
            choices: ["View Product Sales by Department", "Create New Department", "Exit"]
        }
    ).then(function(response) {
        switch (response.command) {
           
            case "View Product Sales by Department":
                viewSales();
                break;
            
            case "Create New Department":
                createDepartment()
                break;
            
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

function viewSales() {
    connection.query(
        "SELECT * FROM products ORDER BY department_name",
        function(err, res) {
            if (err) throw err;
            console.log(`\n${"ID".padEnd(2,' ')}  ${"PRODUCT NAME".padEnd(25,' ')} ${"DEPARTMENT".padEnd(20,' ')}   ${"PRICE".padStart(6,' ')} ${"QTY".padStart(8,' ')}`.blue);
            console.log("".padEnd(68,"-").bold);
            res.forEach(function(row){
                console.log(`${row.item_id.toString().padStart(2,' ')}  ${row.product_name.padEnd(25,' ')} ${row.department_name.padEnd(20,' ')} $ ${row.price.toFixed(2).padStart(6,' ')} ${row.stock_quantity.toString().padStart(8,' ')}`);
            });
            console.log('\n');

            showOptions();
        }
    );
    
}

function viewLowInventory() {
    connection.query(
        "SELECT * FROM products WHERE stock_quantity < 5 ORDER BY department_name",
        function(err, res) {
            if (err) throw err;
            console.log(`\n${"ID".padEnd(2,' ')}  ${"PRODUCT NAME".padEnd(25,' ')} ${"DEPARTMENT".padEnd(20,' ')}   ${"PRICE".padStart(6,' ')} ${"QTY".padStart(8,' ')}`.blue);
            console.log("".padEnd(68,"-").bold);
            res.forEach(function(row){
                console.log(`${row.item_id.toString().padStart(2,' ')}  ${row.product_name.padEnd(25,' ')} ${row.department_name.padEnd(20,' ')} $ ${row.price.toFixed(2).padStart(6,' ')} ${row.stock_quantity.toString().padStart(8,' ')}`);
            });
            console.log('\n');
            
            showOptions();
        }
    );
    
}

function addToInventory() {
    inquirer.prompt([
        {
            type: 'number',
            name: "id",
            message: "Enter the product ID to which inventory is being added:"
        },
        {
            type: 'number',
            name: "qty",
            message: "Enter the quantity being added:"
        }
    ]).then(function(response) {
        connection.query(
            "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?",
            [response.qty, response.id],
            function(err) {
                if (err) throw err;
                console.log(`Quantity ${response.qty} added to product ${response.id}.`);
                console.log('\n');
                
                showOptions();
            }
        );
    });
}

function createDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: "name",
            message: "Enter the name of the new product:"
        },
        {
            type: 'input',
            name: "dept",
            message: "Enter the department:"
        },
        {
            type: 'number',
            name: "price",
            message: "Enter the unit price:"
        },
        {
            type: 'number',
            name: "qty",
            message: "Enter the initial stock quantity:"
        }
    ]).then(function(response) {
        connection.query(
            "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)",
            [response.name, response.dept, response.price, response.qty],
            function(err) {
                if (err) throw err;
                console.log("\nProduct added:\n".green);
                console.log(`${"PRODUCT NAME".padEnd(25,' ')} ${"DEPARTMENT".padEnd(20,' ')}   ${"PRICE".padStart(6,' ')} ${"QTY".padStart(8,' ')}`.blue);
                console.log("".padEnd(68,"-").bold);
                console.log(`${response.name.padEnd(25,' ')} ${response.dept.padEnd(20,' ')} $ ${response.price.toFixed(2).padStart(6,' ')} ${response.qty.toString().padStart(8,' ')}`);
                console.log('\n')
                
                showOptions();
            }
        );
    });
}
