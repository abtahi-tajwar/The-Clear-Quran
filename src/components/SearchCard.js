import React from 'react'
import styled from "styled-components";
import EditIcon from '@mui/icons-material/Edit';
// import { colors } from '../Style.style';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function SearchCard({ data }) {
    const colors = useSelector(data => data.settings.colors)
  return (
    <Wrapper colors={colors}>
        <p className="title">{ data.chapter } ({ data.chapterEnglish }) </p>
        { data.verses.map(verse => <Link to={`/surah-single/${verse.chapterId}?verse=${verse.verseId}`}><div className="details">
            <p class="verse-details">{verse.verseInEnglish} <span className="ayat-marking">{verse.verseId}</span></p>
            <p class="arabic"><span className="ayat-marking">{verse.verseId}</span> {verse.verseInAurabic}</p>
        </div></Link>) }
    </Wrapper>
  )
}

const Wrapper = styled.div`
    width: 100%;
    box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.09);
    border-radius: 6px;
    box-sizing: border-box;
    padding-left: 25px;
    padding-top: 35px;
    padding-bottom: 10px;
    padding-right: 20px;
    margin: 20px 0px;
    position: relative;
    .title {
        position: absolute;
        background-color: ${props => props.colors.base};
        color: white;
        left: 10px;
        top: -10px;
        padding: 5px 15px;
    }
    .details {
        .verse-details {
            font-weight: bold;
            line-height: 1rem;
        }
        .arabic {
            text-align: right;
        }
        .ayat-marking {
            border: 1px solid black;
            border-radius: 50%;
            height: 20px;
            width: 20px;
            display: inline-block;
            text-align: center;
            font-size: 0.7rem;
            margin: 0px 5px;
            line-height: 1rem;
        }
        border-bottom: 1px solid black;
    }
    .action-button {
        position: absolute;
        right: 20px;
        top: 20px;
        border: none;
        outline: none;
        color: white;
        height: 32px;
        width: 32px;
        border-radius: 50%;
        background-color: ${props => props.colors.base};
        cursor: pointer;
        transition: background .3s ease-out;
        &:hover {
            background-color: ${props => props.colors.baseLight};
        }
    }
`


export default SearchCard