import React, { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../Context/GlobalState";

const ResultCard = ({ movie }) => {
  const { addMovieToWatchList, watchList } = useContext(GlobalContext);

  let storedMovie = watchList.find((x) => x.id === movie.id);

  const watchListDisabled = storedMovie ? true : false;

  return (
    <Results>
      <Poster>
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
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
            Add to WatchList
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
const Title = styled.h3``;
const Release = styled.h4``;
const Controls = styled.div``;
const Button = styled.button``;

export default ResultCard;
