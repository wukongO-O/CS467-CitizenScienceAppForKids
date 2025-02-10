CREATE DATABASE IF NOT EXISTS citizen_science_app;
CREATE USER IF NOT EXISTS 'capstone'@'localhost' IDENTIFIED BY 'OSUcapstone';
GRANT ALL PRIVILEGES ON citizen_science_app.* TO 'capstone'@'localhost';
GRANT CREATE, DROP ON *.* TO 'capstone'@'localhost';
FLUSH PRIVILEGES;