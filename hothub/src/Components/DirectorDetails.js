import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import styled from "styled-components";

const DirectorDetails = () => {
  const {productionId} = useParams();
const [production, setProduction] = useState([]);
const [castInfo, setCastInfo] = useState([])
const [productionInfo, setProductionInfo] = useState([])

useEffect(()=> {
  const findProduction = async() => {
    try{
      const res = await fetch(`https://api.themoviedb.org/3/person/${productionId}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`)
      const productionDetails = await res.json()
      console.log(productionDetails)
      setProduction(productionDetails.crew)
      setCastInfo(productionDetails.cast)
    } catch(err) {
      console.log(err, "there ain't no actors here")
    }
  }
  const findProductionInfo = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/person/${productionId}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`
      );
      const productionInfoDetails = await res.json();
      setProductionInfo(productionInfoDetails);
      console.log(productionInfoDetails)
    } catch (err) {
      console.log(err, "there ain't no actors here");
    }
  };
  findProduction()
  findProductionInfo()
}, [])

  return (
    <>
      {(productionInfo.profile_path === null) ?  (
        <DetailWrapper>
          <div>{productionInfo.name}</div>
          <div> &nbsp; known for {productionInfo.known_for_department}</div>
          <div>{productionInfo.birthday}</div>
          <div>{productionInfo.deathday}</div>
          <div>{productionInfo.place_of_birth}</div>
          <div>{productionInfo.biography}</div>
        </DetailWrapper>
      ) : (productionInfo.deathday === null) ? (
        <DetailWrapper>
          <img src={`https://image.tmdb.org/t/p/w200${productionInfo.profile_path}`}
          ></img>
          <Details>
            <div>{productionInfo.name}</div>
            <div>{productionInfo.birthday}</div>
            <div>{productionInfo.place_of_birth}</div>
            <div>{productionInfo.biography}</div>
          </Details>
        </DetailWrapper>
      ) : (
        <DetailWrapper>
        <img src={`https://image.tmdb.org/t/p/w200${productionInfo.profile_path}`}
      ></img>
          <div>{productionInfo.name}</div>
          <div>{productionInfo.birthday}</div>
          <div>{productionInfo.deathday}</div>
          <div>{productionInfo.place_of_birth}</div>
          <div>{productionInfo.biography}</div>
        </DetailWrapper>
      )}
      <CreditWrapper>
        {production.map((act) => (
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

      {castInfo.map((crewDetails) => (
        <>
        <Link to={`/movies/${crewDetails.id}`}>
        <img style={{height:"200px", width:"150px"}} src={`https://image.tmdb.org/t/p/w200${crewDetails.poster_path}`} />
        </Link>
        <div>{crewDetails.job}</div>
        <div>{crewDetails.title}</div>
        </>
      ))}
    </>
  );;
};

const CreditWrapper = styled.div``;

const DetailWrapper = styled.div`
  display: flex;
`;

const Details = styled.div``;

export default DirectorDetails;
