import axios from 'axios'
import React from 'react'
import NoteCard from '../../components/NoteCard'
import { routes, headers } from '../../routes'
import { useSelector } from 'react-redux/es/exports'
import Navbar from '../../components/Navbar'
import ClipLoader from "react-spinners/ClipLoader"
import { Container } from '../../Style.style'
import Modal from '../../components/Modal'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import { colors } from '../../Style.style'
import TextField from '@mui/material/TextField'
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux/es/exports'
import { replace } from '../../redux/notesSlice'
import { init as notesInit } from '../../redux/notesSlice'

function Notes() {
    const data = useSelector(data => data)
    const dispatch = useDispatch()
    
    const [load, setLoad] = React.useState(true);
    const [addNoteModalOpen, setAddNoteModalOpen] = React.useState(false)
    const [note, setNote] = React.useState("")
    const [currentNote, setCurrentNote] = React.useState()
    const [editLoad, setEditLoad] = React.useState(false)

    const handleAddNoteModalOpen = () => setAddNoteModalOpen(true) 
    const handleAddNoteModalClose = () => setAddNoteModalOpen(false)
    const handleNote = e => setNote(e.target.value) 
    const handleUpdateNote = () => {
        setEditLoad(true)
        if (data.user.userId) {
            axios.post(routes.updateNote, {
                id: currentNote.id,
                chapterId: currentNote.chapterId,
                userId: data.user.userId,
                note
            }).then(res => {
                if (res.data.status === 'Success') {
                    console.log(res.data.response.notes)
                    dispatch(replace(res.data.response.notes))
                    setEditLoad(false)
                    setNote("")
                    setEditLoad(false)
                    setAddNoteModalOpen(false)
                } else {
                    console.log(res.data)
                }
            })
        }
    }
    const handleSelectNoteToEdit = (current_note) => {
        setAddNoteModalOpen(true)
        setCurrentNote(current_note)
        setNote(current_note.note)
    }
    React.useEffect(() => {
        if (data) {
            if (data.notes.length > 0 ) {
                setLoad(false)
            }
        } 
    }, [data])
  return (
    <div>
        <Navbar />
        {currentNote && <Modal 
            open={addNoteModalOpen} 
            handleClose={handleAddNoteModalClose}
            title={`Edit Note "${currentNote.paragraph.title}" `}
        > 
            <p><b>Verse {currentNote.paragraph.fromVerseId} to {currentNote.paragraph.toVerseId}</b></p>
            <TextField
                id="outlined-multiline-static"
                label="Write your note here"
                multiline
                rows={4}
                value={note}
                onChange={handleNote}
                style={{ width: '100%'}}
            />
            <Button 
                variant="contained" 
                style={{ marginTop: '15px', backgroundColor: colors.base }}
                endIcon={<EditIcon />}
                onClick={handleUpdateNote}
                disabled={editLoad}
            > Edit </Button> &nbsp;&nbsp; {editLoad && <ClipLoader />}
        </Modal> }
        <Container>
            {!load ? 
                <React.Fragment>{data.notes.map(data => <NoteCard key={data.id} data={data} action={handleSelectNoteToEdit} />)}</React.Fragment> :
                <ClipLoader />
            }
        </Container>
        
    </div>
  )
}

export default Notes