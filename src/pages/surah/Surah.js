import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styled from "styled-components";
import { Container, Grid } from "../../Style.style";
import SurahCard from "../../components/SurahCard";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";

function Surah() {
  const [load, setLoad] = useState(true);
  const [data, setData] = useState([]);

  let body = {
    userID: 2,
    LastUpdatedTimeTicks: 0,
  };

  const getChapters = () => {
    axios.post(`http://122.175.33.146:7070/api/GetChapters`, body).then((res) => {
      setData(res.data.response.chapters);
      setLoad(false);
    });
  };

  const override = css`
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 50%;
  `;

  useEffect(() => {
    getChapters();
  }, []);

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
