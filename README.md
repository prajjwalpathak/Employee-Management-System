# Employee Management System
1. Clone the repository.
2. Change the directory to EMS-Backend using ```$ cd EMS-Backend```.
3. Create a .env file using the format given below.
4. On the terminal, run ```$ npm i``` to install all the dependencies.
5. Now change the directory to EMS-Frontend using ```$ cd EMS-Frontend```, and on the terminal, run ```$ npm i``` to install all the dependencies.
6. Open SSMS and run the <b>Database.sql</b> script to create the database along with all the tables and stored procedures.
<br>
<b>Note:</b> Create your own .env file in the root directory. Here's the format:
<br>
<br>

```
PORT = 5000
SECRET_KEY = "Any secret key"
DB_NAME = "EMSDatabase"
DB_HOST = "localhost"
DB_USERNAME = "database username"
DB_PASSWORD = "database password"
DB_PORT = "1433"
```

## To start the backend server
1. Change the directory to EMS-Backend.
2. Run ```$ npm run dev``` on the terminal to start the server on port 5000.

## To start the frontend server
1. Change the directory to EMS-Frontend.
2. Run ```$ npm start``` on the terminal to start the server on port 3000.
