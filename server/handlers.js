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


function login(email, password, callback) {
  const bcrypt = require('bcrypt');
  const MongoClient = require('mongodb@3.1.4').MongoClient;
 const client = new MongoClient('mongodb+srv://Jenamass:'+configuration.MONGODB_KEY+'@cluster0.3lrot.mongodb.net/?retryWrites=true&w=majority');

  client.connect(function (err) {
    if (err) return callback(err);

    const db = client.db('HotHub');
    const users = db.collection('users');

    users.findOne({ email: email }, function (err, user) {
      if (err || !user) {
        client.close();
        return callback(err || new WrongUsernameOrPasswordError(email));
      }

      bcrypt.compare(password, user.password, function (err, isValid) {
        client.close();

        if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));

        return callback(null, {
            user_id: user._id.toString(),
            nickname: user.nickname,
            email: user.email
          });
      });
    });
  });
}

function getByEmail(email, callback) {
  const MongoClient = require('mongodb@3.1.4').MongoClient;
const client = new MongoClient('mongodb+srv://Jenamass:'+configuration.MONGODB_KEY+'@cluster0.3lrot.mongodb.net/?retryWrites=true&w=majority');

  client.connect(function (err) {
    if (err) return callback(err);

    const db = client.db('HotHub');
    const users = db.collection('users');

    users.findOne({ email: email }, function (err, user) {
      client.close();

      if (err) return callback(err);
      if (!user) return callback(null, null);

      return callback(null, {
        user_id: user._id.toString(),
        nickname: user.nickname,
        email: user.email
      });
    });
  });
}




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
  login,
};
