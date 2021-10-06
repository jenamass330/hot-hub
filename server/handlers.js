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
      ? res.status(200).json({ status: 200, data: users })
      : res.status(404).json({ status: 404, message: "users not found" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "nope" });
  }
  client.close();
};

// get one user

const getUser = async (req, res) => {
  console.clear();
  const client = await new MongoClient(MONGO_URI, options);
  const email = req.params.email;

  try {
    // connect
    await client.connect();

    // declare db
    const db = client.db("HotHub");

    const user = await db.collection("users").findOne({ email: email });

    // status
    if (user) {
      res.status(200).json({ status: 200, data: user });
    } else {
      const newUser = { email, watchedList: [], watchlist: [], reviews: [] };
      await db.collection("users").insertOne(newUser);
      res.status(200).json({ status: 200, data: newUser });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "nope" });
  }
  client.close();
};

//post user

const postUser = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("HotHub");
    const email = req.body.email;
    let foundUser = false;

    const users = await db.collection("users").find().toArray();
    // const users = await db.collection("users").findOne({email});

    users.forEach((user) => {
      if (user.email === email) {
        foundUser = true;
      }
    });

    if (!foundUser) {
      const newUser = req.body;
      await db.collection("users").insertOne(newUser);
      res
        .status(200)
        .json({ status: 200, data: newUser, message: "user posted" });
    } else {
      res.status(200).json({ status: 200, message: "the user exists" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "nope didn't work" });
  }
  client.close();
};

const updateWatchlist = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("HotHub");
    const query = { email: req.body.email };
    const user = await db.collection("users").findOne(query);


    if (user) {
      const newWatchlist = { $set: { watchlist: req.body.watchlist } };
      await db.collection("users").findOneAndUpdate(query, newWatchlist);
      const userUpdated = await db.collection("users").findOne(query);
      res
        .status(200)
        .json({ status: 200, data: userUpdated, message: "watchlist updated" });
    } else {
      const newUser = req.body;
      await db.collection("users").insertOne(newUser);
      res
        .status(200)
        .json({ status: 200, data: newUser, message: "user posted" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "nope didn't work" });
  }
  client.close();
};

const updateWatchedList = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("HotHub");
    const query = { email: req.body.email };
    const user = await db.collection("users").findOne(query);

    // const movieWatched = user.watchlist.movie

    if (user) {
      const newWatchedList = { $set: { watchedList: req.body.watchedList } };
      await db.collection("users").findOneAndUpdate(query, newWatchedList);
      // if (movieWatched === req.body.watchedList.movie) {
      //   await db.collection("users").deleteOne({movieWatched})
      // }
      const userUpdated = await db.collection("users").findOne(query);
      res
        .status(200)
        .json({
          status: 200,
          data: userUpdated,
          message: "watchedList updated",
        });
    } else {
      const newUser = req.body;
      await db.collection("users").insertOne(newUser);
      res
        .status(200)
        .json({ status: 200, data: newUser, message: "user posted" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "nope didn't work" });
  }
};

const deleteFromWatchList = async (req, res) => {
  const id = req.params.id;
  const client = await new MongoClient(MONGO_URI, options);
  await client.connect();
  const db = client.db("HotHub");

  try {
    await db.collection("users").findOne({ id });

    await db.collection("users").deleteOne({ id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "nope" });
  }
};

const postReviewToMoviePage = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("HotHub");
    const {review, movieId, movieTitle, rating, moviePicture} = req.body;

    // const movieReviews = await db.collection("movieReviews").find().toArray();

    const foundMovie = await db
      .collection("movieReviews")
      .findOne({ movieId });

 

    if (!foundMovie) {
      await db.collection("movieReviews").insertOne({movieId, reviews:[review]});
    }

    await db
      .collection("movieReviews")
      .updateOne(
        { movieId},
        { $push: { reviews: review } }
      );

    await db
      .collection("users")
      .updateOne(
        { email: review.email },
        { $push: { reviews: {review, movieTitle, rating, moviePicture}} }
      );

    res
      .status(200)
      .json({ status: 200, message: "review posted" });

    // const movieReviews = await db.collection("movieReviews").insertOne(review);
    // if(movieReviews) {
    //   res
    //     .status(200)
    //     .json({ status: 200, data: movieReviews, message: "review posted" });
    // } else {
    //   res.status(200).json({ status: 200, message: "what the heck are you tryin to do" });
    // }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "nope didn't work" });
  }
  client.close();
};

const getReviews = async (req, res) => {
  const client = await new MongoClient(MONGO_URI, options);

  try {
    // connect
    await client.connect();

    // declare db
    const db = client.db("HotHub");

    const reviews = await db.collection("movieReviews").find().toArray();

    // status
    reviews
      ? res.status(200).json({ status: 200, data: reviews })
      : res.status(404).json({ status: 404, message: "users not found" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "nope" });
  }
  client.close();
};

const getReviewsById = async (req, res) => {
  console.clear();
  const client = await new MongoClient(MONGO_URI, options);
  const movieId = req.params.movieId;

  try {
    // connect
    await client.connect();

    // declare db
    const db = client.db("HotHub");

    const reviewById = await db.collection("movieReviews").findOne({ movieId });

    // status
    if (reviewById) {
      res.status(200).json({ status: 200, data: reviewById });
    } else {
      res
        .status(400)
        .json({ status: 400, message: "no review for this movie" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "nope" });
  }
  client.close();
};

module.exports = {
  testing,
  getUsers,
  getUser,
  postUser,
  updateWatchlist,
  updateWatchedList,
  deleteFromWatchList,
  postReviewToMoviePage,
  getReviews,
  getReviewsById,
};
