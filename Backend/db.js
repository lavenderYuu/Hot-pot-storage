import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MyPassword",
  database: "proj23",
});

export default db;
