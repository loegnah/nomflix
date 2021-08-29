import React from "react";
import styled from "styled-components";

const Item = styled.div`
  height: 100%;
`;

function Videos({ result, id }) {
  return (
    <Item key={id}>
      <iframe
        title={result.key}
        id="player"
        type="text/html"
        height="100%"
        src={`http://www.youtube.com/embed/${result.key}?enablejsapi=1&origin=http://example.com`}
        frameBorder="0"
      ></iframe>
    </Item>
  );
}

export default Videos;
