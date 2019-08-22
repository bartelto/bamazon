require("dotenv").config();

let keys = require("../keys.js");
let mysql = require('mysql');
let colors = require('colors');
let inquirer = require('inquirer');
const {table} = require('table');

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: keys.mysql.password,
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("\nBamazon Supervisor Portal\n".cyan);
    //console.log("\nConnected as id " + connection.threadId + "\n");
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
    // only shows departments for which there are products in the 'products' table
    connection.query(
        "SELECT department_id, " +
        "departments.department_name, " +
        "overhead_costs, " +
        "SUM(products.product_sales) AS product_sales, " + 
        "SUM(products.product_sales) - overhead_costs AS total_profit " + 
        "FROM departments " +
        "INNER JOIN products ON departments.department_name = products.department_name " +
        "GROUP BY department_id;",
        function(err, res) {
            if (err) throw err;
            let data = [];
            //let headers = [];
            data.push(Object.keys(res[0])); // headers
            res.forEach(function(row1) {
                let row = [];
                row.push(row1.department_id);
                row.push(row1.department_name);
                row.push(row1.overhead_costs.toFixed(2));
                row.push(row1.product_sales.toFixed(2));
                row.push(row1.total_profit.toFixed(2));
                data.push(row);
            });
            let config = {columns: {
                0: { alignment: 'center' },
                1: { alignment: 'left' },
                2: { alignment: 'right' },
                3: { alignment: 'right' },
                4: { alignment: 'right' },
            }}
            console.log(table(data, config));
            showOptions();
        }
    );
    
}

function createDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: "dept",
            message: "Enter the name of the new department:"
        },
        {
            type: 'number',
            name: "overhead",
            message: "Enter the overhead cost for the department:"
        }
    ]).then(function(response) {
        connection.query(
            "INSERT INTO departments (department_name, overhead_costs) VALUES (?,?)",
            [response.dept, response.overhead],
            function(err) {
                if (err) throw err;
                console.log(`\nNew department "${response.dept}" added.\n`.green);
                
                showOptions();
            }
        );
    });
}
