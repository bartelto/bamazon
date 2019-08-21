USE bamazon;

CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(100) NOT NULL,
    overhead_costs DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (department_id)
);