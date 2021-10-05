"use strict";

// importing node_modules.
const express = require("express");
const morgan = require("morgan");

const { testing, getUsers, getUser, postUser, updateWatchlist, updateWatchedList,deleteFromWatchList, findMovieById} = require("./handlers");

express()
  .use(express.static("public"))
  .use(morgan("tiny"))
  .use(express.json())

  //ENPOINTS 👇

  .get("/test", testing)

  .get("/users", getUsers)

  .get('/user/:email', getUser)

  .get('/movie/:id', findMovieById)

  .post('/user', postUser)

  .post('/watchlist', updateWatchlist)

  .post('/watchedlist', updateWatchedList)

  .delete('/watchlist/:id', deleteFromWatchList)

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
