import React from 'react'
import styled from "styled-components";
import EditIcon from '@mui/icons-material/Edit';
// import { colors } from '../Style.style';
import { useSelector } from 'react-redux/es/hooks/useSelector';


function NoteCard({ data, action }) {
    const stateData = useSelector(data => data)
    const surahData = stateData.surah
    const colors = stateData.settings.colors
    const surah = surahData.find(s => s.chapterId === data.chapterId )
  return (
    <Wrapper id={`notes_${data.id}`} colors={colors}>
        <p className="title">{data.paragraph.title} ({ surah.titleInAurabic })</p>
        <div className="details">
            <p class="verse-details">Verse {data.paragraph.fromVerseId} - {data.paragraph.toVerseId}</p>
            <p>{data.note}</p>
        </div>
        <button className='action-button' onClick={() => action(data)}><EditIcon /></button>
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
            line-height: 0.6rem;
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

export default NoteCard