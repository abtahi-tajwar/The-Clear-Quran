import React from 'react'
import Modal from './Modal'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function GlobalSearch({ search, open, handleClose }) {    
    const data = useSelector(data => data)
    const notesData = data.notes
    const surahData = data.surah

    const [surah, setSurah] = React.useState([])
    const [notes, setNotes] = React.useState([])

    React.useEffect(() => {
        if (open) {
            if (search !== "") {
                setSurah(surahData.filter(item => (item.titleInEnglish.toLowerCase().includes(search.toLowerCase()) || item.titleInAurabic.toLowerCase().includes(search.toLowerCase()))))
                setNotes(notesData.filter(item => item.note.includes(search)))
            } else {
                setSurah([])
                setNotes([])
            }
            
        }
    }, [open])
  return (
    <div>
        <Modal
            open={open}
            handleClose={handleClose}
            title="Global Search"
        >
            <Wrapper>
                <h2>Surah</h2>
                <div className="searchCard">
                    { surah.length > 0 ? <React.Fragment>
                        { surah.map(item => <Link className="card" to={`/surah#surah_${item.chapterId}`}>
                            <p><b>{item.titleInEnglish}</b></p>
                            <p>{item.titleInAurabic}</p>
                        </Link>) }
                    </React.Fragment> : <p>No Surah Found</p> }
                </div>
                <h2>Notes</h2>
                <div className="searchCard">
                    { notes.length > 0 ? <React.Fragment>
                        { notes.map(item => <Link className="card" to={`/notes#notes_${item.id}`}>
                            <p><b>{item.paragraph.title}</b></p>
                            <p>{item.note.length > 50 ? item.note.substring(0,50)+"..." : item.note }</p>
                        </Link>) }
                    </React.Fragment> : <p>No Notes Found</p> }
                </div>
            </Wrapper>
        </Modal>
    </div>
  )
}
const Wrapper = styled.div`
    z-index: 30000;
    .searchCard {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        grid-template-rows: auto;
        grid-gap: 5px;
        .card {
            box-sizing: border-box;
            text-align: center;
            font-size: 0.8rem;
        }
    }
`
export default GlobalSearch