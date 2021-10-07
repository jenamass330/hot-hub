import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import WatchedMini from "./WatchedMini";
import WatchListMini from "./WatchListMini";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userData, setUserData] = useState({});
  const [userreviews, setUserReviews] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch("/user/" + user.email)
        .then((res) => res.json())
        .then((data) => {
          setUserData(data.data);
          setUserReviews(data.data.reviews);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  }, [isAuthenticated]);


  if (isLoading) {
    return <div></div>;
  }
  return (
    isAuthenticated && (
      <>
        <BigWrap>
          <Picture src={user.picture} alt={user.name} />
          <Wrap>
            <Name>{user.name}</Name>
            <Email>{user.email}</Email>
          </Wrap>
        </BigWrap>

        <WatchListMini setUserData={setUserData} userData={userData} />
        {userData.watchedList && <WatchedMini setUserData={setUserData} userData={userData} watched={userData.watchedList} />}
        <Title>Ratings and Reviews</Title>
        <ReviewWrapper>
          <UserName>{user.name} left a review on:</UserName>
          {userreviews
            ? userreviews.map((review) => (
                <>
                  <ReviewSmallWrap>
                    <WholeReview>
                      <PosterTitleReviewWrap>
                        <div>
                          <Poster
                            src={`https://image.tmdb.org/t/p/w200${review.review.moviePicture}`}
                          ></Poster>
                        </div>
                        <div
                          style={{
                            textAlign: "center",
                            width: "70%",
                            marginTop: "20px",
                            paddingLeft: "10px",
                          }}
                        >
                          <Movie>{review.movieTitle}</Movie>
                          <Review>"{review.review.review}"</Review>
                          <Rating>Rating: {review.review.rating}</Rating>
                        </div>
                      </PosterTitleReviewWrap>
                    </WholeReview>
                  </ReviewSmallWrap>
                </>
              ))
            : null}
        </ReviewWrapper>
      </>
    )
  );
};

const WholeReview = styled.div``;

const UserName = styled.div`
  margin-bottom: 40px;
`;

const Poster = styled.img`
  height: 190px;
`;
const Rating = styled.div`
  margin-top: 30px;
`;

const Movie = styled.div`
  font-size: 25px;
  text-align: center;
  margin-left: 50%;
  transform: translateX(-50%);
  width: 100%;
  margin-top: 10px;
`;

const Review = styled.div`
  margin-top: 40px;
`;

const PosterTitleReviewWrap = styled.div`
  display: flex;
`;

const Wrap = styled.div`
  margin-top: 55px;
  margin-left: 10px;
`;
const BigWrap = styled.div`
  display: flex;
  width: 50%;
  margin-left: 50%;
  transform: translateX(-50%);
`;

const Name = styled.h1`
  font-size: 25px;
`;
const Email = styled.h2``;

const Picture = styled.img`
  border-radius: 50%;
  height: 150px;
`;

const Title = styled.div`
  position: absolute;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 200px;
  font-size: 25px;
  letter-spacing: 3px;
  box-shadow: 0 4px 4px -3px darkred;
`;

const ReviewWrapper = styled.div`
  position: absolute;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 270px;
  width: 40%;
  text-align: center;
  align-items: center;
  margin-bottom: 150px;
`;
const ReviewSmallWrap = styled.div`
  margin-bottom: 20px;
  align-items: center;
  text-align: center;
  box-shadow: 1px 1px 10px 1px darkred;
  background-color: #eae6d7;
  padding: 20px;
`;

export default Profile;
