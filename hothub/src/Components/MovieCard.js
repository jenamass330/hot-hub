import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MovieControls from "./MovieControls";

const MovieCard = ({ movie, type, userData, setUserData }) => {
  return (
    <>
      <Card>
        <Overlay>
          {movie.poster_path ? (
            <>
              <Link to={`/movies/${movie.id}`}>
                <Poster
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={`${movie.title} Poster`}
                />
              </Link>
            </>
          ) : (
            <div></div>
          )}
        </Overlay>
        <MovieControls setUserData={setUserData} userData={userData} type={type} movie={movie} />
      </Card>
    </>
  );
};

const Overlay = styled.div``;
const Card = styled.div``;

const Poster = styled.img`
  height: 100px;
`;

export default MovieCard;
