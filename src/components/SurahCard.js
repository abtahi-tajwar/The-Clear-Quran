import React from "react";
import styled from "styled-components";
import { Flex, colors } from "../Style.style";
import MeccaIcon from "../images/icons/kaaba-mecca.png";
import MedinaIcon from "../images/icons/mosque.png";
import { Link } from "react-router-dom";

function SurahCard({ data }) {
  return (
    <Link to="/surah-single"><Wrapper>
        <div className="info-card">
          <p className="count">{data.chapterId}</p>
          <div className="class">
            <img src={data.isMadina ? MedinaIcon : MeccaIcon} />
          </div>
          <Flex className="verses">{data.totalVersesCount} Verses</Flex>
        </div>
        <h2 className="title">{data.titleInEnglish}</h2>
        <p className="title-arabic">{data.titleInAurabic}</p>
        <p className="info">1 Paragraph, 1 Notes</p>
      </Wrapper>
    </Link>
  );
}

export const Wrapper = styled.div`
  position: relative;
  height: 105px;
  width: 100%;
  box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.09);
  border-radius: 6px;
  box-sizing: border-box;
  padding-left: 95px;
  padding-top: 8px;
  .title {
    font-size: 1.3rem;
  }
  .title-arabic {
    font-size: 0.8rem;
    color: #272727;
  }
  .info {
    color: ${colors.dark};
    font-size: 0.9rem;
    font-weight: bold;
  }
  .info-card {
    height: 87px;
    width: 87px;
    position: absolute;
    left: -22px;
    top: -18px;
    box-shadow: 0px 2px 6px 4px rgba(0, 0, 0, 0.03);
    border-radius: 6px;
    overflow: hidden;
    background-color: white;
  }
  .count {
    position: absolute;
    left: 8px;
    top: 8px;
    font-weight: bold;
  }
  .verses {
    position: absolute;
    left: 0px;
    bottom: 0px;
    right: 0px;
    background-color: ${colors.base};
    color: white;
    font-weight: bold;
    font-size: 0.8rem;
  }
  .class {
    position: absolute;
    top: 8px;
    right: 4px;
    height: 22px;
    width: 22px;
    border-radius: 50%;
    background-color: #d9d9d9;
    display: flex;
    justify-content: center;
    align-items: center;
    & > img {
      width: 60%;
    }
  }
`;

export default SurahCard;
