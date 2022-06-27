import React from 'react'
import styled from "styled-components";
import EditIcon from '@mui/icons-material/Edit';


function NoteCard({ data }) {
  return (
    <Wrapper>
        <p className="title">{data.title}</p>
        <div className="details">
            <p>Verse {data.paragraph.fromVerseId} - {data.paragraph.toVerseId}</p>
            <p>{data.note}</p>
        </div>
        <button className='action-button'><EditIcon /></button>
    </Wrapper>
  )
}
const Wrapper = styled.div`

`

export default NoteCard