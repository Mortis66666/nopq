'use strict';

require("dotenv").config();

const { MongoClient } = require("mongodb");
const axios = require("axios").default;
const uri = process.env.uri;
const client = new MongoClient(uri);

function randInt(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function createUserId() {
    return Math.random().toString().replace(/[0-9]\./,'');
}

async function randWord() {
    let charCount = randInt(7, 15);
    let generateResult = randInt(1, 10);
    let result =  await axios.get(`http://random-word-api.herokuapp.com/word?length=${charCount}&number=${generateResult}`);
    let data = result.data;

    return data[randInt(0, data.length-1)];
}

async function createUser(userId) {
    try {
        const users = client.db("nopq").collection("users");
        let id;

        {
            id = randInt(1000, 9999);
            console.log(id);
        } while (await users.findOne({
            name: "User" + id
        }));

        await users.insertOne({
            _id: userId,
            name: "User" + id
        });

    } finally {
        await client.close();
    }
}

async function createGame(gameId, host) {
    try {
        const games = client.db("nopq").collection("games");

        await games.insertOne({
            _id: gameId,
            players: [ host ]
        });

    } finally {
        client.close();
    }
}

async function addPlayer(gameId, user) {
    try {
        const games = client.db("nopq").collection("games");

        await games.updateOne(
            {
                _id: gameId
            },
            {
                $push: {
                    players: user
                }
            }
        );

    } finally {
        client.close();
    }
}

async function removePlayer(gameId, user) {
    try {
        const games = client.db("nopq").collection("games");

        await games.updateOne(
            {
                _id: gameId
            },
            {
                $pull: {
                    players: user
                }
            }
        )

        await games.findOneAndDelete({
            _id: gameId,
            players: []
        });

    } finally {
        client.close();
    }
}

async function getGame(gameId) {
    try {
        const games = client.db("nopq").collection("games");

        return await games.findOne({ _id: gameId });

    } finally {
        client.close();
    }
}

async function createRoomId() {
    let id;

    {
        id = ""
        for (let i = 0; i < 4; i++) {
            id += String.fromCharCode(randInt(65, 90));
        }
    } while (await getGame(id));
}


// Exports
exports.createUserId = createUserId;
exports.randWord = randWord;
exports.createUser = createUser;
exports.createGame = createGame;
exports.addPlayer = addPlayer;
exports.removePlayer = removePlayer;
exports.getGame = getGame;
exports.createRoomId = createRoomId;
