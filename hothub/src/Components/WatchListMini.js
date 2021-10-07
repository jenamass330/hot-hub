import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import MovieCard from "./MovieCard";

const WatchListMini = ({ userData, setUserData }) => {
  let history = useHistory();



  return (
    <>
      <WholeWrap>
        <Boxed>
          <Title>Watchlist:</Title>
          <ViewLength>
            {userData.watchlist ? (
              <div>{userData.watchlist.length} movies</div>
            ) : null}
            <ViewMore
              style={{ textDecoration: "underline", color: "darkred" }}
              onClick={() => history.push("/watchlist")}
            >
              View More
            </ViewMore>
          </ViewLength>
          <Wrapper>
            {userData.watchlist ? (
              <>
                {userData.watchlist.length > 0 ? (
                  <Grid>
                    {userData.watchlist.slice(0, 6).map((movie) => (
                      <MovieCard setUserData={setUserData} userData={userData} title={movie} movie={movie} type="watchList" />
                    ))}
                  </Grid>
                ) : (
                  <div>Add movies to your watchlist!</div>
                )}
              </>
            ) : null}
          </Wrapper>
        </Boxed>
      </WholeWrap>
    </>
  );
};

const WholeWrap = styled.div`
  padding-left: 100px;
  position: relative;
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

const Boxed = styled.div`
  width: 300px;
  margin-top: 50px;
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

export default WatchListMini;
