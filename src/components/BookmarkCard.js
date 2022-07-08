import React from 'react'
import styled from "styled-components";
// import { colors } from '../Style.style';
import { useSelector } from 'react-redux';

function BookmarkCard({ data }) {
    const colors = useSelector(data => data.settings.colors)
  return (
    <Wrapper colors={colors}>
        <p className="title">{data.titleInEnglish} ({data.titleInAurabic})</p>
        <div className="details">
            <p>{data.paragraph} (Verse {data.fromVerseId} - {data.toVerseId})</p>
        </div>
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

export default BookmarkCard