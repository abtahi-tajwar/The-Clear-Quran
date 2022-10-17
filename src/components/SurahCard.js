import React from "react";
import styled from "styled-components";
import { Flex } from "../Style.style";
import MeccaIcon from "../images/icons/kaaba-mecca.png";
import MedinaIcon from "../images/icons/mosque.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Doctrine from '../images/Doctrine.png'
import Stories from '../images/Stories.png'
import Unseen from '../images/Unseen.png'

function SurahCard({ data }) {
  const colors = useSelector(data => data.settings.colors)
  return (
    <Link to={"/surah-single/"+data.chapterId} id={`surah_${data.chapterId}`}><Wrapper colors={colors}>
        <div className="info-card">
          <p className="count">{data.chapterId}</p>
          <div className="class">
            <img src={data.isMadina ? MedinaIcon : MeccaIcon} />
          </div>
          <Flex className="verses">{data.totalVersesCount} Verses</Flex>
        </div>
        <div className="quranic-icons">
          {data.hasThemeDoctrine && <img src={Doctrine} /> }
          {data.hasThemeUnseen && <img src={Stories} /> }
          {data.hasThemeStories && <img src={Unseen} /> }
        </div>
        <h2 className="title">{data.titleInEnglish}</h2>
        <p className="title-arabic">{data.titleInAurabic}</p>
        <p className="info">{data.paragraphs.length} {data.paragraphs.length === 1 ? 'Paragraph' : 'Paragraphs' }, {data.userNotesCount} {data.userNotesCount === 1 ? 'Note' : 'Notes' }</p>
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
  margin-bottom: 45px;
  .title {
    font-size: 1.3rem;
  }
  .title-arabic {
    font-size: 0.8rem;
    color: #272727;
  }
  .quranic-icons {
    position: absolute;
    right: 10px;
    top: 10px;
    display: flex;
    gap: 5px;
    img {
      height: 16px;
    }
  }
  .info {
    color: ${props => props.colors.dark};
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
    background-color: ${props => props.colors.base};
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
