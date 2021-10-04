import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DiscoverControls from "./DiscoverControls";

const RecommendationCard = ({ movie, type }) => {

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
              <DiscoverControls type={type} movie={movie} />
              <div style={{fontSize:"15px", width:"90px", textAlign:"center"}}>{movie.title}</div>
            </>
          ) : (
            <div></div>
          )}
        </Overlay>
      </Card>
    </>
  );
};

const Overlay = styled.div``;
const Card = styled.div``;

const Poster = styled.img`
  height: 150px;
`;

export default RecommendationCard;
