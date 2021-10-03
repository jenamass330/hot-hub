import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "../Context/GlobalState";

const ResultCard = ({ movie }) => {
  const { addMovieToWatchList, addMovieToWatched, watchList, watched } =
    useContext(GlobalContext);

  let storedMovie = watchList.find((x) => x.id === movie.id);
  let storedMovieWatched = watched.find((x) => x.id === movie.id);

  const watchListDisabled = storedMovie
    ? true
    : storedMovieWatched
    ? true
    : false;

  const watchedDisabled = storedMovieWatched ? true : false;

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
            disabled={watchListDisabled}
            onClick={() => addMovieToWatchList(movie)}
          >
            Add to Watchlist
          </Button>

          <Button
            disabled={watchedDisabled}
            onClick={() => addMovieToWatched(movie)}
          >
            Add to Watched
          </Button>
        </Controls>
      </Info>
    </Results>
  );
};

const Results = styled.div`

`;

const Poster = styled.div``;
const Info = styled.div``;
const Header = styled.div``;
const Title = styled.h3`
  width: 200px;
  text-align: center;
  font-weight: bold;
`;
const Release = styled.h4`
  width: 200px;
  text-align: center;
`;
const Controls = styled.div``;
const Button = styled.button``;

export default ResultCard;
