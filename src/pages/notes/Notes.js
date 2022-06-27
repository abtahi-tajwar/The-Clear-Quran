import axios from 'axios'
import React from 'react'
import NoteCard from '../../components/NoteCard'
import { routes } from '../../routes'
import { useSelector } from 'react-redux/es/exports'
import Navbar from '../../components/Navbar'
import ClipLoader from "react-spinners/ClipLoader";
import { Container } from '../../Style.style'

function Notes() {
    const notes = useSelector(data => data.notes)
    const [load, setLoad] = React.useState(true);
    React.useEffect(() => {
        console.log(notes)
        if (notes.length > 0 ) {
            setLoad(false)
        }
    }, [])
  return (
    <div>
        <Navbar />
        <Container>
            {!load ? 
                <React.Fragment>{notes.map(data => <NoteCard key={data.id} data={data} />)}</React.Fragment> :
                <ClipLoader />
            }
        </Container>
        
    </div>
  )
}

export default Notes