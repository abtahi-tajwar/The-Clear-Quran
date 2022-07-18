import React from 'react'
import Navbar from '../../components/Navbar'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Container } from '../../Style.style'
import styled from 'styled-components'
import { ClipLoader } from 'react-spinners'
import BookmarkCard from '../../components/BookmarkCard'
import { Link } from 'react-router-dom'
import { Grid } from '../../Style.style'

function Bookmark() {
    
    const bookmarks = useSelector(data => data.bookmark)
    console.log(bookmarks)
  return (
    <div>
        <Navbar />
        {bookmarks ?
            <Container>
                <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Bookmarks</h1>
                <Grid width="350px" gap="30px" height={"100%"}>
                    {bookmarks.map(bookmark => <Link to={`/surah-single/${bookmark.surahId}?paragraph=${bookmark.id}`}><BookmarkCard data={bookmark} /></Link> )}
                </Grid>
            </Container> :
            <LoadingContainer><ClipLoader /></LoadingContainer>
        }
    </div>
  )
}
const LoadingContainer = styled.div`
    height: 500px;
    width: 100px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
`

export default Bookmark