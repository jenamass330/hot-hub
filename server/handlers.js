"use strict";

// mongodb stuff
const { MongoClient } = require("mongodb");

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

     quotes
      ? res.status(200).json({ status: 200, data: quotes })
      : res.status(404).json({ status: 404, data: "quotes not found" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, data: "nothing works lmao" });
  }
  client.close()
}


module.exports = {
  testing,
  getQuotes,
};
