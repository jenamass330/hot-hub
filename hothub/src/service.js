"use strict";

const { response } = require("express");
// mongodb stuff
const { MongoClient } = require("mongodb");

const request = require('request-promise')

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// post user

// export const postUser = async (data) => {
//     const client = await new MongoClient(MONGO_URI, options);

//     try {
 
//         await client.connect();
//         const db = client.db("HotHub");
//         const newUser = await db.collection("users").insertOne({email: user.email})

//         if(newUser) {
//             return newUser
//         }
// } catch(err) {
//     return err
// }
// }

// // get user

// export const getUser = async(email) => {
//     const client = await new MongoClient(MONGO_URI, options);

//   try {
 
//      await client.connect();
//      const db = client.db("HotHub");
//      const mongoUsers = await db.collection("users").find().toArray()

//      if(mongoUsers) {
//          return mongoUsers
//      } else {
//          postUser()
//      }
// } catch(err) {
//     return err
// }
// }