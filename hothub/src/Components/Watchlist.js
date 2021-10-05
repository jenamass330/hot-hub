import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../Context/GlobalState";
import styled from "styled-components";
import MovieCard from "./MovieCard";
import BigMovieCard from "./BigMovieCard";
import { useAuth0 } from "@auth0/auth0-react";

const Watchlist = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [watchList, setWatchList] = useState([])
  // const { watchList } = useContext(GlobalContext);

  useEffect(() => {
    fetch('/user/'+user.email)
    .then((res) => res.json())
        .then((data) => {
          setWatchList(data.data.watchlist)
          
        })
        .catch((err) => {
          console.log("error", err)
        })
    // console.log(user.email)
    // getUser(user.email).then((data)=> console.log(data))
  
  }, [])

  return (
    <>
    <BigWrap>
    <div>Watchlist</div>
    <div>{watchList.length} movies</div>
      <Wrapper>
        {watchList.length > 0 ? (
          <>
          <Grid>
            {watchList.map((movie) => (
              <>
              <Card>
              <BigMovieCard title={movie.title} movie={movie} type="watchList" />
              </Card>
              </>
            ))}
          </Grid>
          </>
        ) : (
          <div>Add movies to your watchlist!</div>
        )}
      </Wrapper>
      </BigWrap>
    </>
  );
};

const BigWrap = styled.div`
  padding-left: 200px;
  padding-right: 200px;
`

const Wrapper = styled.div`
  
`;
const Grid = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Div = styled.div`
  /* display: none; */
  background-color: white;
`
const Card = styled.div`
&:hover + Div {
  display: block;
}
`

export default Watchlist;
