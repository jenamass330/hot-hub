import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DiscoverControls from "./DiscoverControls";

const ActorDetails = ({ movie, type }) => {
  const { actorId } = useParams();
  const [actor, setActor] = useState([]);
  const [crew, setCrew] = useState([])
  const [actorInfo, setActorInfo] = useState([]);

  useEffect(() => {
    const findActor = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
        );
        const actorDetails = await res.json();
        console.log(actorDetails);
        setActor(actorDetails.cast);
        setCrew(actorDetails.crew)
      } catch (err) {
        console.log(err, "there ain't no actors here");
      }
    };
    const findActorInfo = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
        );
        const actorInfoDetails = await res.json();
        setActorInfo(actorInfoDetails);
      } catch (err) {
        console.log(err, "there ain't no actors here");
      }
    };
    findActor();
    findActorInfo();
  }, []);

  console.log(actorInfo);

  return (
    <>
      {actorInfo.deathday === null ? (
        <DetailWrapper>
          <img src={`https://image.tmdb.org/t/p/w200${actorInfo.profile_path}`}
          ></img>
          <Details>
            <div>{actorInfo.name}</div>
            <div>{actorInfo.birthday}</div>
            <div>{actorInfo.place_of_birth}</div>
            <div>{actorInfo.biography}</div>
          </Details>
        </DetailWrapper>
      ) : (
        <DetailWrapper>
        <img src={`https://image.tmdb.org/t/p/w200${actorInfo.profile_path}`}
      ></img>
          <div>{actorInfo.name}</div>
          <div>{actorInfo.birthday}</div>
          <div>{actorInfo.deathday}</div>
          <div>{actorInfo.place_of_birth}</div>
          <div>{actorInfo.biography}</div>
        </DetailWrapper>
      )}
      <CreditWrapper>
        {actor.map((act) => (
          <>
            <Link to={`/movies/${act.id}`}>
              <img src={`https://image.tmdb.org/t/p/w200${act.poster_path}`} />
            </Link>
            <div>
              {act.title} as {act.character}
            </div>
          </>
        ))}
      </CreditWrapper>

      {crew.map((crewDetails) => (
        <>
        <Link to={`/movies/${crewDetails.id}`}>
        <img style={{height:"200px", width:"150px"}} src={`https://image.tmdb.org/t/p/w200${crewDetails.poster_path}`} />
        </Link>
        <div>{crewDetails.job}</div>
        <div>{crewDetails.title}</div>
        </>
      ))}
    </>
  );
};

const CreditWrapper = styled.div``;

const DetailWrapper = styled.div`
  display: flex;
`;

const Details = styled.div``;

export default ActorDetails;
