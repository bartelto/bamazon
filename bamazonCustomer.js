let mysql = require('mysql');
let colors = require('colors');
let inquirer = require('inquirer');

let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "H0rizon$",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Bamazon connected as id " + connection.threadId + "\n");
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

            connection.end();
        }
    );
}

