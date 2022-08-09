import React from 'react'
import styled from "styled-components";
import InfoIcon from '@mui/icons-material/Info';
// import { colors } from '../Style.style';
import { useSelector } from 'react-redux';

function IntroductionCard({ intro, chapterInfo }) {
    const colors = useSelector(data => data.settings.colors)
    return (
        <Wrapper colors={colors}>
            <div className="intro-icon">
                <InfoIcon />
            </div>
            <div className="intro-card">
                <h3 className="title">Introduction - {chapterInfo.chapterId}. {chapterInfo.titleInEnglish} ({chapterInfo.titleInAurabic})</h3>
                <p className="details">{intro}</p>
            </div>            
        </Wrapper>
    )  
}

const Wrapper = styled.div`
    display: flex;
    gap: 15px;
    .intro-icon {
        height: 50px;
        width: 50px;
        background-color: ${props => props.colors.base};
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        margin-top: 10px;
    }
    .intro-card {
        flex: 1;
        box-shadow: 0px 1px 6px 1px rgba(0, 0, 0, 0.09);
        border-radius: 6px;
        padding: 20px;
        margin-top: 10px;
        position: relative;
        .title {
            color: ${props => props.colors.base};
            font-size: 1.2rem;
            text-transform: capitalize;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",sans-serif;
            &:after {
                content: "";
                display: block;
                height: 1px;
                margin-top: 10px;
                margin-bottom: 10px;
                background-color: lightgray;
            }
        }
        &::before {
            content: "";
            display: block;
            position: absolute;
            left: 20px;
            top: 0px;
            height: 7px;
            width: 150px;
            background-color: ${props => props.colors.base};
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;
        }
    }
`

export default IntroductionCard