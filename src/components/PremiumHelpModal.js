import React from 'react'
import Modal from './Modal'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import ParagraphModeImage from '../images/help/paragraph_mode1.png'
import AllNotes from '../images/help/all_notes.png'
import AddNoteBookmark from '../images/help/add_note_bookmark.png'

function PremiumHelpModal({ open, setOpen }) {
    const colors = useSelector(data => data.settings.colors)
  return (
    <Modal
        open={open}
        handleClose={() => setOpen(false)}
        title="Why should you consider buying our premium"
    >
      <Container colors={colors}>
        <div className="group">
          <h3 className="group-title">Logically Divided Paragraph Mode</h3>
          <p>Check out our new paragraph mode which will give you a comprehensive reading experience at the same time understanding quran more logically. In the paragraph mode, all the surahs' are divided into meaningful groups. This will help you to visualize related verse meanings more clearly.</p>
          <img src={ParagraphModeImage} width="100%"/>
        </div>
        <div className="group">
          <h3 className="group-title">Notes & Bookmarks</h3>
          <p>While reading it is hard to keep track of reading without proper markings. With our bookmark system you can easily bookmark at any paragraph in order to track your reading history. It is also crucial to note down your important information of certain verses. In this case our notes comes into play. You can access your bookmarks and notes of same account on both our mobile app and web app!</p>
          <img src={AllNotes} width="100%"/>
          <img src={AddNoteBookmark} width="100%"/>
        </div>
      </Container>
    </Modal>
  )
}
const Container = styled.div`
  .group {
    margin-bottom: 15px;
    width: 100%;
    .group-title {
      font-size: 1.3rem;
      color: ${props => props.colors.base};
      font-family: unset;
      border-bottom: 2px solid ${props => props.colors.base};
      margin-bottom: 8px;
    }
    img {
      margin-bottom: 10px;
    }
    .double-images {
      width: 100%;
      display: flex;
      height: 300px;
      gap: 10px;
      .image-container {
        flex: 1;
        height: 100%;
        img {
          width: 100%;
          aspect-ratio: 2/1;
          object-fit: cover;
        }
      }
      
    }
  }
`

export default PremiumHelpModal