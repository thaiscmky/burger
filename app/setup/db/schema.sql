CREATE TABLE IF NOT EXISTS burgers_db.burgers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    burger_name VARCHAR (100) NOT NULL,
    devoured BOOLEAN DEFAULT 0
);