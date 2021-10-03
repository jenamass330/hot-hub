import React, { useContext } from "react";
import { GlobalContext } from "../Context/GlobalState";
import styled from "styled-components";
import { AiOutlineEye, AiOutlineClose, AiOutlineCheck } from "react-icons/ai";

const DiscoverControls = ({movie, type}) => {
    const {
        moveToWatchList,
      } = useContext(GlobalContext);

      return (
        <InnerCard>
        {type === "watched" && (
          <>
            <Wrapper>
              <Button
                style={{ border: "none" }}
                onClick={() => moveToWatchList(movie)}
              >
                <AiOutlineEye />
              </Button>
            </Wrapper>
          </>
        )}
      </InnerCard>
      )
}

const InnerCard = styled.div``;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Button = styled.button`
  background-color: transparent;
  border-radius: 50%;
  opacity: 0.5;
  &:hover {
    cursor: pointer;
    background-color: #EAE6D7;
    filter: drop-shadow(0.35rem 0.35rem 0.4rem rgba(0, 0, 0, 0.5));
    opacity: 1;
  }
  &:active {
    transform: scale(0.9);
    box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  }
`;

export default DiscoverControls