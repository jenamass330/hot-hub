import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../Context/GlobalState";
import { useHistory } from "react-router";
import MovieCard from "./MovieCard";
import styled from "styled-components";
import { getUser } from "../service";
import { useAuth0 } from "@auth0/auth0-react";

const WatchedMini = ({watched}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  // const [watched, setWatched] = useState([])
  let history = useHistory();
  

// useEffect(() => {
//   fetch('/user/'+user.email)
//   .then((res) => res.json())
//       .then((data) => {
//         setWatched(data.data.watchedList)
        
//       })
//       .catch((err) => {
//         console.log("error", err)
//       })
//   // console.log(user.email)
//   // getUser(user.email).then((data)=> console.log(data))

// }, [])

  // const { watched } = useContext(GlobalContext);
  
  return (
    <>
      <WholeWrap>
        <Boxed>
          <Title>Watched:</Title>
          <ViewLength>
          {watched ?
            <div>{watched.length} movies</div>
            : null}
            <ViewMore
              style={{ textDecoration: "underline", color: "darkred" }}
              onClick={() => history.push("/watched")}
            >
              View More
            </ViewMore>
          </ViewLength>
          <Wrapper>
            {watched.length > 0 ? (
              <Grid>
                {watched.slice(0, 6).map((movie) => (
                  <MovieCard movie={movie} type="watched" />
                ))}
              </Grid>
            ) : (
              <div>Add movies to watched!</div>
            )}
          </Wrapper>
        </Boxed>
      </WholeWrap>
    </>
  );
};

const WholeWrap = styled.div`
  padding-left: 100px;
  position: relative;
  z-index: 1;
`;
const Boxed = styled.div`
  width: 300px;
  margin-top: 50px;
`;

const Title = styled.div`
  font-size: 25px;
  text-align: center;
  margin-bottom: 15px;
  margin-right: 50px;
`;
const ViewLength = styled.div`
  float: right;
  margin-bottom: 15px;
  padding-right: 50px;
`;

const Wrapper = styled.div``;
const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 250px;
  height: 300px;
  //   border: 1px solid red;
  justify-content: space-between;
  padding: 10px;
`;

const ViewMore = styled.div`
  display: inline-block;
  font-size: 15px;
  &:hover {
    cursor: pointer;
  }
`;

export default WatchedMini;
