const express = require('express');
const pt = require('pg');
const request = require('request');
var app = express();

const { Pool, Client } = require('pg')

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  })

  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_NEWDB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
  })
    
app.get("/", (req, res) => {
    res.send("Hello Docker 20191016161840!!! - Vijay\n");
});

app.get("/createdb", (req, res) => {
    try {
        pool.query('create database ' + process.env.POSTGRES_NEWDB + ';', (error, results) => {
            if (error) {
                console.log(error);
            } else {
                client.connect();
                console.log('connected to database: ' + process.env.POSTGRES_NEWDB);
                res.send(results.rows);
            }    
        });
    } catch (err) {
        console.log(err);
    }
});

app.get("/insert", (req, res) => {
    try {
        client.query('create table employee(id int, empnumber int);', (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results.rows);
            }
        });
        client.query('insert into employee values(1, 4650);', (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results.rows);
            }
        });
        client.query('insert into employee values(2, 3120);', (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results.rows);
            }
        });
        res.send("successfully inserted.");

    } catch (err) {
        console.log(err);
    }
});

app.get("/get", (req, res) => {
    try {
        client.query('SELECT * from employee;', (error, results) => {
            if (error) {
                console.log(error);
            } else {
                res.send(results.rows);
            }    
        });
    } catch (err) {
        console.log(err);
    }
});

app.listen(8080, '0.0.0.0');