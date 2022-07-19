import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styled from "styled-components";
import { Container, Grid } from "../../Style.style";
import SurahCard from "../../components/SurahCard";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { TextField } from "@mui/material";
import themeData from "../../QuranicThemes.json";

function Surah() {
  const [load, setLoad] = useState(true);
  const [search, setSearch] = useState("");
  const data = useSelector((data) => data.surah);
  const [resultData, setResultData] = useState([]);

  React.useEffect(() => {
    if (data.length > 0) {
      setLoad(false);
    }
  }, [data]);
  React.useEffect(() => {
    setResultData(data.filter((item) => item.titleInEnglish.includes(search) || item.titleInAurabic.includes(search)));
  }, [search]);

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
        <TextField
          id="outlined-basic"
          label="Search Chapters"
          style={{ width: "100%", maxWidth: "500px", marginBottom: "40px" }}
          variant="outlined"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Grid width="350px" gap="30px" height={"100%"}>
          {resultData && resultData.map((data, i) => <SurahCard data={data} key={i} />)}
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
