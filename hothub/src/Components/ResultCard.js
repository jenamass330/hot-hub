import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const ResultCard = ({ movie, userData, setUserData }) => {
  const { user } = useAuth0();
  const [disabled, setDisabled] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    setDisabled(checkIfMovieInWatchList(movie));
  }, []);

  useEffect(() => {
    setDisabledButton(checkIfMovieInWatchedList(movie));
  }, []);

  const addMovieToWatchList = (movie) => {
    let watchArray = [...userData.watchlist];
    watchArray.push(movie);
    let postObject = {
      method: "PUT",
      body: JSON.stringify({ email: user.email, watchlist: watchArray }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch("/watchlist", postObject)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        window.location.reload()
      });
  };

  const checkIfMovieInWatchList = (movie) => {
    let found = false;

    userData.watchlist.forEach((mov) => {
      if (movie.id === mov.id) found = true;
    });

    return found;
  };

  const checkIfMovieInWatchedList = (movie) => {
    let foundMovie = false;

    userData.watchedList.forEach((mo) => {
      if (movie.id === mo.id) foundMovie = true;
    });

    return foundMovie;
  };

  // getuser info (for email and array of movie to watch)
  // you will have a user object with email and an array

  // push the new movie into the array of movies to watch
  // from the service, do an updateWatchlist with (email, new array)

  const addMovieToWatched = (movie) => {
    let watchedArray = [...userData.watchedList];
    watchedArray.push(movie);
    let postedObject = {
      method: "PUT",
      body: JSON.stringify({ email: user.email, watchedList: watchedArray }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    fetch("/watchedlist", postedObject)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        return data;
      });
  };

  return (
    <Results>
      <Poster>
        {movie.poster_path ? (
          <Link to={`/movies/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={`${movie.title} Poster`}
            />
          </Link>
        ) : (
          <div></div>
        )}
      </Poster>

      <Info>
        <Header>
          <Title>{movie.title}</Title>
          <Release>
            {movie.release_date ? movie.release_date.substring(0, 4) : null}
          </Release>
        </Header>
        <Controls>
          <Button
            disabled={disabled}
            onClick={() => addMovieToWatchList(movie)}
          >
            Add to Watchlist
          </Button>
          <Button
            disabled={disabledButton}
            onClick={() => addMovieToWatched(movie)}
          >
            Add to Watched
          </Button>
        </Controls>
      </Info>
    </Results>
  );
};

const Results = styled.div``;

const Poster = styled.div``;
const Info = styled.div``;
const Header = styled.div``;
const Title = styled.h3`
  width: 350px;
  text-align: center;
  font-weight: bold;
`;
const Release = styled.h4`
  width: 350px;
  text-align: center;
`;
const Controls = styled.div``;
const Button = styled.button``;

export default ResultCard;
