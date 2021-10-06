import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "../Context/GlobalState";
import { useAuth0 } from "@auth0/auth0-react";
import { updateWatchedlist, updateWatchlist } from "../service";
import { AiOutlineStar } from "react-icons/ai";

const ReviewCard = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    fetch("/review/" + movieId)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data.data.reviews);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [movieId]);

  console.log(reviews);

  return (
    <>
      {reviews ? (
        <>
          <Div style={{ marginTop: "50px" }}>Ratings & Reviews</Div>
          {reviews.map((review) => (
            <>
              <Wrapper>
                <Wrapped>
                  <Review>{review.review}</Review>
                  <Rating>{review.rating}</Rating>
                  <div><AiOutlineStar style={{color:"#ffd800", fontSize:"60px", position:"absolute", right:"0px", marginTop:"-80px"}}/></div>
                </Wrapped>
                <Square></Square>
                <NamePic>
                  <Avatar src={review.userPic} />
                  <UserName>{review.userName}</UserName>
                </NamePic>
              </Wrapper>
            </>
          ))}
        </>
      ) : null}
    </>
  );
};

const Div = styled.div`
  font-size: 25px;
  letter-spacing: 3px;
  border-bottom: 1px solid grey;
  box-shadow: 0 4px 4px -3px darkred;
  width: 300px;
  text-align: center;
  margin-left: 50%;
  transform: translate(-50%);
  margin-bottom: 50px;

`;

const Wrapper = styled.div`
  width: 50%;
  margin-left: 50%;
  transform: translateX(-50%);
  background-color: #eae6d7;
  margin-bottom: 100px;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 15px 10px -2px darkred; ;
`;
const Wrapped = styled.div``;

const NamePic = styled.div`
  display: flex;
  position: absolute;
  margin-top: 25px;
  margin-left: 30px;
`;

const UserName = styled.div`
  font-size: 15px;
  margin-top: 25px;
  margin-left: 15px;
  z-index: 10;
`;

const Avatar = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const Review = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
  margin-left: 10px;
  letter-spacing: 3px;
  font-size: 20px;
`;
const Square = styled.div`
  width: 0;
  height: 0;
  position: absolute;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 20px solid #eae6d7;
  border-radius: 10px;
  margin-top: 5px;
`;

const Rating = styled.div`
    position: absolute;
    right: 0;
    margin-top: -57px;
    margin-right: 18px;
    z-index: 10;
`

export default ReviewCard;
