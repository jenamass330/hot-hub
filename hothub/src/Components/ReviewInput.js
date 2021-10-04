import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";


const ReviewInput = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [review, setReview] = useState("");
  const [charCount, setCharCount] = useState(0)

  const reviewField = (e) => {
    setReview(e.target.value);
    setCharCount(e.target.value.length)
  };

  const submitReview = () => {
      if (charCount > 10) {

    fetch("/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: review }),
    });
    } else {
        window.alert("You need a minimum of 10 characters to post!")
    }
  };

  console.log(review);


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
            placeholder="Drop a review!"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Drop a review!")}
          ></TextBox>
          
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


export default ReviewInput;
