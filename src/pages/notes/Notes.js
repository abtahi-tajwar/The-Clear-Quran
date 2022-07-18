import axios from 'axios'
import React from 'react'
import styled from 'styled-components'
import NoteCard from '../../components/NoteCard'
import { routes, headers } from '../../routes'
import { useSelector } from 'react-redux/es/exports'
import Navbar from '../../components/Navbar'
import ClipLoader from "react-spinners/ClipLoader"
import { Container } from '../../Style.style'
import Modal from '../../components/Modal'
import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
// import { colors } from '../../Style.style'
import TextField from '@mui/material/TextField'
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux/es/exports'
import { replace } from '../../redux/notesSlice'
import { init as notesInit } from '../../redux/notesSlice'
import { Buttonbtn } from '../../Style.style'


function Notes() {
    const data = useSelector(data => data)
    const dispatch = useDispatch()
    const [search, setSearch] = React.useState("")
    const [load, setLoad] = React.useState(true);
    const [addNoteModalOpen, setAddNoteModalOpen] = React.useState(false)
    const [note, setNote] = React.useState("")
    const [currentNote, setCurrentNote] = React.useState()
    const [editLoad, setEditLoad] = React.useState(false)
    const [resultData, setResultData] = React.useState([])
    const colors = data.settings.colors
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
            setResultData(data.notes)
            if (data.notes.length > 0 ) {
                setLoad(false)
            }
        } 
    }, [data])
    React.useEffect(() => {
        if (search !== "") {            
            const searchResult =  data.notes.filter(item => item.note.includes(search))
            setResultData(searchResult)
        } else {
            setResultData(data.notes)
        }
    }, [search])
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
            <EditConfirmButtonContainer><Buttonbtn 
                style={{ marginTop: '15px', backgroundColor: colors.base }}
                onClick={handleUpdateNote}
                disabled={editLoad}
            > <EditIcon /> Edit </Buttonbtn> {editLoad && <ClipLoader />}</EditConfirmButtonContainer>
        </Modal> }
        
        <Container>
            <h1 style={{ marginTop: '20px', textAlign: 'center'}}>All Notes</h1>
            <TextField
                id="outlined-basic"
                label="Search Notes"
                style={{ width: '100%', maxWidth: "500px", marginTop: '30px' }}
                variant="outlined"
                name="search"
                onChange={e => setSearch(e.target.value)}
            />`
            {!load ? 
                <React.Fragment>{resultData.map(data => <NoteCard key={data.id} data={data} action={handleSelectNoteToEdit} />)}</React.Fragment> :
                <LoadingContainer><ClipLoader /></LoadingContainer>
            }
        </Container>        
    </div>
  )
}

const LoadingContainer = styled.div`
    height: 500px;
    width: 100px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
`
const EditConfirmButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: flex-start;
    align-items: center;
    margin-top: 15px;
    & > button {
        margin-top: 0px !important;
    }
`

export default Notes