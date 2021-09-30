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


const testing = (req, res) => {
  res.status(200).json({ status: 200, data: "success" });
};

//MONGODB AUTH0






// const getQuotes = async (req, res) => {
//   const client = await new MongoClient(MONGO_URI, options);

//   try {
 
//      await client.connect();

//      const db = client.db("HotHub");
 
//      const quotes = await db.collection("quotes").find().toArray();


//      quotes
//       ? res.status(200).json({ status: 200, data:  quotes[Math.floor(Math.random() * quotes.length)]})
//       : res.status(404).json({ status: 404, data: "quotes not found" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ status: 500, data: "nothing works lmao" });
//   }
//   client.close()
// }




module.exports = {
  testing,
  // getQuotes,
};
