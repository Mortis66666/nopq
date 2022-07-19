require("dotenv").config();

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { MongoClient } = require("mongodb");
const uri = process.env.uri;
const client = new MongoClient(uri);
const port = process.env.PORT || 3000;

// Use
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded());

// Set
app.set("view engine", "ejs");


// Get
app.get('/', (req, res) => {
    res.render("index.ejs");
})

app.get('/create', (req, res) => {
    res.render("create.ejs");
})

app.post('/create', (req, res) => {
    const {nbplayer, time} = req.body;
    res.send(`${nbplayer} ${time}`);
})


// Run
server.listen(port, () => {
    console.log(`Running server at http://localhost:${port}`);
})
