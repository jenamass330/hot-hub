"use strict";

// importing node_modules.
const express = require("express");
const morgan = require("morgan");

const { testing, getUsers, getUser, postUser, updateWatchlist, updateWatchedList, postReviewToMoviePage, getReviews, getReviewsById} = require("./handlers");

express()
  .use(express.static("public"))
  .use(morgan("tiny"))
  .use(express.json())

  //ENPOINTS 👇

  .get("/test", testing)

  .get("/users", getUsers)

  .get('/user/:email', getUser)

  .get('/reviews', getReviews)

  .get('/review/:movieId', getReviewsById)

  .post('/review', postReviewToMoviePage)

  .post('/user', postUser)

  .put('/watchlist', updateWatchlist)

  .put('/watchedlist', updateWatchedList)

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
