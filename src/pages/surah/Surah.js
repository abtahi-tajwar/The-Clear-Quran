import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styled from "styled-components";
import { Container, Grid } from "../../Style.style";
import SurahCard from "../../components/SurahCard";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Surah() {
  const [load, setLoad] = useState(true);
  const data = useSelector(data => data.surah)

  React.useEffect(() => {
    if(data.length > 0) {
      setLoad(false);
    }
  }, [data])

  const override = css`
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
  `;

  return (
    <Wrapper>
      <Navbar />
      <Container style={{ marginTop: "30px" }}>
        <Grid width="350px" gap="30px" height={"100%"}>
          {data && data.map((data, i) => <SurahCard data={data} key={i} />)}
          <ClipLoader loading={load} color={"#210F13"} size={100} css={override} />
        </Grid>
      </Container>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 100%;
`;
export default Surah;
