-- CREATE DATABASE pizza;

USE pizza;

DROP TABLE IF EXISTS orders;

CREATE TABLE orders(
	id INT AUTO_INCREMENT,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
    method VARCHAR(10),
    size VARCHAR(10),
    timestamp DATETIME DEFAULT NOW(),
    
    PRIMARY KEY (id)
);

INSERT INTO orders (
    firstName,
    lastName,
    email,
    method,
    size
) VALUES (
    'John', 
    'Doe', 
    'john@mail.com', 
    'delivery',
    'large'
);