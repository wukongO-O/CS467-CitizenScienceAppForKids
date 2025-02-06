Quick note
- Start sql server (one-time):

  ```bash
  mysql.server start
  ```
  
- Set up sql database in terminal:

  ```bash
  mysql -u root -p < setup.sql
  ```
  - Password for `mysql -u root -p`: <enter>

  
- Test connection:

  ```bash
  mysql -u capstone -p
  ```
    
  - Password for connecting: OSUcapstone


- Install pytest:

  ```bash
  pip install pytest
  ```
- Run all tests in and from tests directory:

  ```bash
  pytest
  ```
 
- Run all tests from backend directory:

  ```bash
  python -m pytest
  ```
 
  - Show detailed output and print statements
  
  ```bash
  python -m pytest -v -s
  ```