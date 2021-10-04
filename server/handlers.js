"use strict";

const { response } = require("express");
// mongodb stuff
const { MongoClient } = require("mongodb");

// const assert = require("assert");

// const request = require('request-promise')

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//test

const testing = (req, res) => {
  res.status(200).json({ status: 200, data: "success" });
};

//MONGODB AUTH0

const getUsers = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);

  try {
      // connect
      await client.connect();

      // declare db
      const db = client.db("HotHub");

      const users = await db.collection("users").find().toArray();

      // status
      users
          ? res.status(200).json({ status: 200, data: users})
          : res.status(404).json({ status: 404, message: "users not found" });
  } catch (err) {
      console.log(err);
      res.status(500).json({ status: 500, message: "nope" });
  }
  client.close()
};

const postUser = async(req, res) => {
  const client = await new MongoClient(MONGO_URI, options);

  await client.connect();

  try {

    const db = client.db("HotHub");

    const newUser = await db.collection("users").insertOne(req.body);

    res.status(200).json({ status: 200, data: req.body, message: "success" });
  

  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: 500, message: "nope didn't work" });
  }
  client.close()
}





module.exports = {
  testing, getUsers, postUser
};
