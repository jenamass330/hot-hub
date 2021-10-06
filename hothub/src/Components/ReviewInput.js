import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const ReviewInput = ({ movieId, movieTitle, moviePicture }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [charCount, setCharCount] = useState(0);

  const reviewField = (e) => {
    setReview(e.target.value);
    setCharCount(e.target.value.length);
  };

  const ratingField = (e) => {
    setRating(e.target.value);
  };


  const submitReview = (e) => {
    e.preventDefault();
    if (charCount > 10) {
      fetch("/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movieId: movieId,
          movieTitle: movieTitle,
          review: {
            email: user.email,
            userName: user.name,
            userPic: user.picture,
            review: review,
            rating: rating,
            moviePicture: moviePicture,
          },
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            window.location.reload();
          }
        });
    } else {
      window.alert("You need a minimum of 10 characters to post!");
    }
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    isAuthenticated && (
      <>
        <Form onSubmit={submitReview}>
          <Avatar src={user.picture} alt={user.name} />

          <TextBox
            onChange={reviewField}
            type="text"
            list="stars"
            placeholder="Drop a review!"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Drop a review!")}
          ></TextBox>
          <Label for="rating"></Label>
          <Select value={rating} onChange={ratingField} required>
            <Option value="" selected disabled hidden>
              Rating:
            </Option>
            <Option value="1">🍿</Option>
            <Option value="2">🍿🍿</Option>
            <Option value="3">🍿🍿🍿</Option>
            <Option value="4">🍿🍿🍿🍿</Option>
            <Option value="5">🍿🍿🍿🍿🍿</Option>
          </Select>
          <Button>Post</Button>
        </Form>
      </>
    )
  );
};

const Form = styled.form`
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 100px;
`;

const TextBox = styled.input`
  border: none;
  width: 725px;
  height: 190px;
  margin-left: 10px;
  outline: none;
  background-color: #eae6d7;
  border: 1px solid black;
  margin-left: 50%;
  transform: translateX(-50%);
`;

const Button = styled.button`
  background-color: grey;
  border: 1px solid black;
  color: white;
  height: 30px;
  width: 753px;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  border-radius: 5px;
  letter-spacing: 3px;
  margin-left: 10px;
  margin-top: -130px;
  margin-left: 50%;
  transform: translateX(-50%);
`;
const Avatar = styled.img`
  border-radius: 50%;
  position: absolute;
  height: 100px;
  margin-top: -50px;
  margin-left: 50%;
  transform: translateX(-50%);
  z-index: 10;
`;

const Option = styled.option`
  font-size: 40px;
`;

const Select = styled.select`
  position: absolute;
  width: 10;
  height: 10;
  margin-left: 74%;
  transform: translateX(-50%);
  margin-top: -180px;
  border-radius: 20px;
  background-color: #eae6d7;
  border: none;
  display: inline-block;
  text-align: center;
  font-size: 20px;
`;

const Label = styled.label`
  margin-left: 66%;
  transform: translateX(-50%);
  margin-top: -181px;
  position: absolute;
  font-weight: bold;
  color: darkred;
  display: inline-block;
`;

export default ReviewInput;
