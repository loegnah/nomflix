import React from "react";
import styled from "styled-components";
import Spinner from "react-spinners/BeatLoader";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 28px;
  margin-top: 20vh;
`;


const Loader = () => (
  <Container>
    <Spinner color="rgba(66,66,66,0.5)" loading={true} size={50} />
  </Container>
);

export default Loader;
