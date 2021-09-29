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

const getQuotes = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);

  try {
     // connect
     await client.connect();

     // declare db
     const db = client.db("HotHub");
 
     // look inside collection "companies"
     const quotes = await db.collection("quotes").find().toArray();

    //  let intervalFunc = setInterval(myTimer, 30000);
    //  const myTimer = () => {
    //    quotes[Math.floor(Math.random() * quotes.length)]
    //  }

     quotes
      ? res.status(200).json({ status: 200, data:  quotes[Math.floor(Math.random() * quotes.length)]})
      : res.status(404).json({ status: 404, data: "quotes not found" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: "nothing works lmao" });
  }
  client.close()
}

const getMovies = async(req, res) => {
  return request ('https://api.themoviedb.org/3/movie/550?cf51531f9662b6605e90cc8d3835ea99')
  .then((res) => {
    parsedResponse = JSON.parse(res)
    console.log(parsedResponse)
    if(parsedResponse) {
    res.status(200).json({status: 200, data: parsedResponse, message: "all good"})} else {
      res.status(400).json({status: 400, message: "nope"})
    }
  })
  .catch((err) => {
    res.status(400).json({status: 400, message: "nuuuuupe"})
  })
}


module.exports = {
  testing,
  getQuotes,
  getMovies
};
