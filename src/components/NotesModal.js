import React from 'react'
import Modal from './Modal'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'

function NotesModal({ open, setOpen, surah }) {
    const data = useSelector(data => data)
    const notes = data.notes
    const colors = data.settings.colors
    const [filteredNotes, setFilteredNotes] = React.useState()

    React.useEffect(() => {
        if (notes) {
            setFilteredNotes(notes.filter(note => note.chapterId === surah.chapterId))
        }
    }, [notes])
  return (
    <Modal
        open={open}
        handleClose={() => setOpen(false)}
        title={`All Notes from ${surah.titleInAurabic}`}
    >
        {
            !filteredNotes ? 
            <ClipLoader /> :
            filteredNotes.length === 0 ?
                <p>No Notes Exists</p> :
                filteredNotes.map(data => 
                <NoteCard colors={colors}>
                    <p className="title">{data.paragraph.title} ({ surah.titleInAurabic })</p>
                    <div className="details">
                        <p class="verse-details">Verse {data.paragraph.fromVerseId} - {data.paragraph.toVerseId}</p>
                        <p>{data.note}</p>
                    </div>
                </NoteCard>
                )
        }
    </Modal>
  )
}

const NoteCard = styled.div`
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

export default NotesModal