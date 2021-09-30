import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { CgDetailsMore } from "react-icons/cg";
import styled from "styled-components";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  let history = useHistory();

  return (
    <>
      <Nav>
        <Ul>
          <Li>
            <a
              href="#"
              onClick={() => setOpen(!open)}
              style={{ color: "black" }}
            >
              <CgDetailsMore />
            </a>
            {open ? (
              <Dropdown>
                <Item
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  Home
                </Item>
                <Item
                  onClick={() => {
                    history.push("/About");
                  }}
                >
                  About
                </Item>
                <Item
                  onClick={() => {
                    history.push("/Contact");
                  }}
                >
                  Contact
                </Item>
              </Dropdown>
            ) : null}
          </Li>
        </Ul>
      </Nav>
    </>
  );
};

const Nav = styled.nav`
  padding: 0 1rem;
  background-color: #fff8dc;
  margin-top: 15px;
  position: inherit;
  z-index: 1000;
  font-size: 30px;
`;
const Ul = styled.ul`
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`;
const Li = styled.li``;

const Dropdown = styled.div`
  background-color: #fff8dc;
  position: absolute;
  top: 58px;
  width: 200px;
  transform: translateX(-10%);
  margin-top: -10px;
  padding: 1rem;
  overflow: hidden;
`;
const Item = styled.a`
  height: 50px;
  display: flex;
  align-items: center;
  transition: background(200ms);
  padding: 0.5rem;
  color: black;
  text-decoration: none;

  &:hover {
    background-color: darkred;
    color: white;
  }
`;

export default Navbar;
