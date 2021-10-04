import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Credits from "./Credits";
import Recommendation from "./Recommendation";
import ReviewInput from "./ReviewInput";

const MovieDetails = () => {
  const { movieId } = useParams();

  const [film, setFilm] = useState([]);

  useEffect(() => {
    const filmInfo = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
        );
        const movieDetails = await res.json();
        setFilm(movieDetails);
      } catch (err) {
        console.log(err, "something ain't right");
      }
    };
    filmInfo();
  }, [movieId]);

  return (
    <>
      <BigWrap>
        <img
          style={{ height: "300px", width: "205px" }}
          src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
        ></img>
        <Wrapper>
          {film.tagline === "" ? (
            <>
              <Info>
                <Title>{film.original_title}</Title>
              </Info>
              <OverView>Overview: {film.overview}</OverView>
              <Release>Release date: {film.release_date}</Release>
            </>
          ) : (
            <>
              <Info>
                <Title>{film.original_title}</Title>
                <div>"{film.tagline}"</div>
              </Info>
              <OverView>Overview: {film.overview}</OverView>
              <Release>Release date: {film.release_date}</Release>
            </>
          )}
        </Wrapper>
      </BigWrap>
      <Recommendation />
      <Credits />
      <ReviewInput />
    </>
  );
};

const Wrapper = styled.div``;

const BigWrap = styled.div`
  display: flex;
  border: 1px solid darkred;
  width: 800px;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-bottom: 50px;
  margin-top: 40px;
  padding: 20px;
  background-color: #eae6d7;
  box-shadow: 1px 1px 10px 1px darkred;
`;

const Info = styled.div`
  text-align: center;
  margin-left: 5%;
  width: 400px;
`;

const OverView = styled.div`
  margin-top: 10%;
  transform: translateY(-10%);
  margin-left: 10px;
  font-size: 20px;
`;

const Title = styled.div`
  font-size: 25px;
  letter-spacing: 3px;
  font-weight: bold;
  text-transform: uppercase;
`;

const Release = styled.div`
  position: absolute;
  bottom: 0px;
  margin-bottom: 20px;
  margin-left: 15%;
`;

export default MovieDetails;
