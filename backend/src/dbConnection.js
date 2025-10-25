import mysql from "mysql2/promise";

export var db;
try {
  db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "recommendation_system",
    password: "Nitin@9811",
  });

  console.log('connected to database')
} catch (error) {
    console.log('unable to connect with database')
}
