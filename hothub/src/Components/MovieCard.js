import React from "react";
import styled from "styled-components";
import MovieControls from "./MovieControls";

const MovieCard = ({ movie, type }) => {
  return (
    <>
      <Card>
        <Overlay>
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={`${movie.title} Poster`}
            />
          ) : (
            <div></div>
          )}
        </Overlay>
        <MovieControls type={type} movie={movie} />
      </Card>
    </>
  );
};

const Overlay = styled.div``;
const Card = styled.div``;

export default MovieCard;
