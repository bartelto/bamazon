USE bamazon;

SELECT department_id,
departments.department_name,
overhead_costs,
SUM(products.product_sales) AS product_sales,
SUM(products.product_sales) - overhead_costs AS total_profit
FROM departments
INNER JOIN products ON departments.department_name = products.department_name
GROUP BY department_id;