const express = require('express');
const pt = require('pg');
const request = require('request');
var app = express();

const { Pool, Client } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'mypostgres',
    database: 'postgres',
    password: 'vijay',
    port: 5432,
  })

  const client = new Client({
    user: 'postgres',
    host: 'mypostgres',
    database: 'vjdb',
    password: 'vijay',
    port: 5432,
  })
    
app.get("/", (req, res) => {
    res.send("Hello Docker!!! - Vijay\n");
});

app.get("/createdb", (req, res) => {
    try {
        pool.query('create database vjdb;', (error, results) => {
            if (error) {
                console.log(error);
            } else {
                client.connect();
                res.send(results.rows);
            }    
        });
    } catch (err) {
        console.log(err);
    }
});

app.get("/insert", (req, res) => {
    try {
        client.query('create table table1(id int, age int);', (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results.rows);
            }
        });
        client.query('insert into table1 values(1, 40);', (error, results) => {
            if (error) {
                console.log(error);
            } else {
                console.log(results.rows);
            }
        });
        client.query('insert into table1 values(2, 30);', (error, results) => {
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
        client.query('SELECT * from table1;', (error, results) => {
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