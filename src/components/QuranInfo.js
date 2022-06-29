import React from 'react'
import Doctrine from '../images/Doctrine.png'
import Stories from '../images/Stories.png'
import Unseen from '../images/Unseen.png'
import Modal from './Modal'
import styled from 'styled-components'

function QuranInfo({ open, handleClose }) {
    return (
        <div>
            <Modal
                open={open}
                handleClose={handleClose}
                title="QURAN THEMES"
            >
                <Wrapper>
                    <p>The Quran has 3 main themes as represented by the following 3 symbols.</p>
                    <div className='divider'></div>
                    <div>
                        <img src={Doctrine} /> <span><b>Doctrine</b></span>
                        <p>(e.g., acts of worship, human interactions, family relations, and business transactions), which focuses mainly on a Muslim’s relationship with Allah, other people, and the rest of Allah’s creation.)</p>
                    </div>
                    <div>
                        <img src={Stories} /> <span><b>Stories</b></span>
                        <p>(e.g., the story of Moses, Noah, and Ṣâliḥ), which served two purposes: to reassure the Prophet’s heart, as he was met with rejection in Mecca, and as cautionary tales for the pagans (see 11:120-123). Other stories (e.g., Joseph and Job) focus on moral lessons.)</p>
                    </div>
                    <div>
                        <img src={Unseen} /> <span><b>Unseen</b></span>
                        <p>(e.g., the belief in Allah and His qualities, as well as angels, resurrection, judgment, etc.), which reaffirms one’s faith in the divine through one’s heart, not eyes. Some chapters contain more than one theme, and some individual verses may touch on a theme not presented here, but the following table represents the general themes covered in the body of the text.)</p>
                    </div>
                </Wrapper>
            </Modal>
        </div>
    )
}
const Wrapper = styled.div`
    z-index: 30000;
`

export default QuranInfo