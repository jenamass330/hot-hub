import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DiscoverControls from "./DiscoverControls";

const DiscoverCard = ({ movie, type, userData, setUserData }) => {
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
        <DiscoverControls
          userData={userData}
          setUserData={setUserData}
          type={type}
          movie={movie}
        />
      </Card>
    </>
  );
};

const Overlay = styled.div``;
const Card = styled.div``;

const Poster = styled.img`
  height: 100px;
`;

export default DiscoverCard;
