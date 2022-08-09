import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import styled from 'styled-components'
import IntroductionCard from '../../components/IntroductionCard'
import AddNoteIcon from '../../images/icons/add-note.png'
import BookmarkIcon from '../../images/icons/bookmark.png'
import { routes } from '../../routes'
import axios from 'axios'
import Modal from '../../components/Modal'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import ConfirmationPopup from '../../components/ConfirmationPopup'
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import InfoIcon from '@mui/icons-material/Info';
import Checkbox from '@mui/material/Checkbox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch } from 'react-redux'
import { add as notesStateAdd } from '../../redux/notesSlice'
import { add as addBookmarkState } from '../../redux/bookmarkSlice'
import { addBookmark as addBookmarkToSurah } from '../../redux/surahSlice'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Buttonbtn, Flex } from '../../Style.style'
import { CircularProgress, colors } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

function SurahSingle2() {
    const { id } = useParams()
    const data = useSelector(data => data)
    const allSurah = data.surah
    
    const colors = data.settings.colors
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams();

    const [userId, setUserId] = React.useState(data.user ? data.user.userId : -1)
    const [surah, setSurah] = React.useState()
    const [paragraphWiseVerse, setParagraphWiseVerse] = React.useState()
    const [note, setNote] = React.useState()
    const [addNoteModalOpen, setAddNoteModalOpen] = React.useState(false)
    const [currentParagraph, setCurrentParagraph] = React.useState()
    const [selectedParagraphId, setSelectedParagraphId] = React.useState(0)
    const [settingsOpen, setSettingsOpen] = React.useState(false)
    const [fontSize, setFontSize] = React.useState(18)
    const [paragraphMode, setParagraphMode] = React.useState(!data.user ? false : true)
    const [showAurabic, setShowAurabic] = React.useState(true)
    const [showEnglish, setShowEnglish] = React.useState(true)
    const [addNoteLoading, setAddNoteLoading] = React.useState(false)
    const [footNoteOpen, setFootNoteOpen] = React.useState(false)
    const [currentFootnote, setCurrentFootnote] = React.useState({
        serial: 0,
        text: '',
        verse: 0
    })
    const [confirmationPopup, setConfirmationPopup] = React.useState({        
        isOpen: false,
        text: "",
        error: false
    })
    React.useEffect(() => {
        setUserId(data.user ? data.user.userId : -1)
        if (data.user) {
            if (data.user.isPaid) {
                setParagraphMode(true)
            } else {
                setParagraphMode(false)
            }
        }        
    }, [data.user])
    React.useEffect(() => {
        console.log("All surah updated")
        setSurah(allSurah.find(s => s.chapterId === parseInt(id)))        
    }, [allSurah])
    React.useEffect(() => {
        const queryParagraphId = parseInt(searchParams.get("paragraph"))
        const queryVerseId = parseInt(searchParams.get("verse"))
        // Load the first paragraph when user enter
        if (queryParagraphId) {
            scrollToParagraph(null, queryParagraphId)
        } else if(queryVerseId) {
            if (paragraphWiseVerse) {
                const initialParagraphId = paragraphWiseVerse.find(p => p.verses.find(v => v.verseId === queryVerseId)).id
                scrollToParagraph(null, initialParagraphId)
            }
        }
    }, [paragraphWiseVerse])
    React.useEffect(() => {
        if (surah) {
            let temp = []
            surah.paragraphs.forEach(paragraph => {
                let temp_verses = []
                for (let i = paragraph.fromVerseId; i <= paragraph.toVerseId; i++) {
                    temp_verses.push(surah.verses.find(v => v.verseId === i))
                }
                temp.push({
                    ...paragraph,
                    verses: temp_verses
                })
            })
            setParagraphWiseVerse(temp)
        }
    }, [surah])

    const scrollToParagraph = (e, id) => { 
        setSelectedParagraphId(id) 
        // Event can be null as the funcion is also called without event 
        if (e) {
            document.querySelectorAll(".selector").forEach(item => {
                item.classList.remove("selected")
            })         
            e.target.classList.add("selected")  
        }   
        if (id === -1) {
            var element = document.getElementById(`introduction`);
        } else {
            var element = document.getElementById(`surah-paragraph-${id}`);
        }        
        
        if (element) {
            var headerOffset = 180;
            var elementPosition = element.getBoundingClientRect().top;
            var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    }
    const handleAddNote = () => {
        setAddNoteLoading(true)
        axios.post(routes.createNote, {
            id: 0,
            chapterId: surah.chapterId,
            paragraphId: currentParagraph.id,
            userId: userId,
            note
        }).then(response => {
            setNote("")
            setAddNoteModalOpen(false)
            if (response.data.status === "Success") {
                dispatch(notesStateAdd({
                    ...response.data.response.notes,
                    paragraph: currentParagraph,
                    userId: userId
                }))
                setAddNoteLoading(false)
                setConfirmationPopup({ 
                    isOpen: true,
                    text: "Note added successfully",
                    error: false
                })
            } else {
                setConfirmationPopup({ 
                    isOpen: true,
                    text: "Something went wrong",
                    error: true
                })
            }
        })
    }
    const addNoteAction = (paragraph) => {
        setCurrentParagraph(paragraph)
        setAddNoteModalOpen(true)
    }
    const handleTranslation = e => {
        if (e.target.value === 'both') {
            setShowAurabic(true)
            setShowEnglish(true)
        } else if(e.target.value === 'tcq') {
            setShowAurabic(false)
            setShowEnglish(true)
        } else {
            setShowAurabic(true)
            setShowEnglish(false)
        }
    }
    const increaseFontSize = () => {
        setFontSize(fontSize + 1)
    }
    const decreaseFontSize = () => {
        setFontSize(fontSize - 1)
    }
    const addBookmark = (e, paragraph) => {
        e.target.classList.add("disabled")
        axios.post(routes.addBookmark, {
            paragraphId: paragraph.id,
            userId: userId
        }).then(response => {
            if (response.data.status === "Success") {
                const currentDate = new Date()
                const timestamp = currentDate.getTime()
                const newBookmark = {
                    id: paragraph.id,
                    paragraphId: paragraph.id,
                    surahId: surah.chapterId,
                    titleInEnglish: surah.titleInEnglish,
                    titleInAurabic: surah.titleInAurabic,
                    paragraph: paragraph.title,
                    fromVerseId: paragraph.fromVerseId,
                    toVerseId: paragraph.toVerseId,
                    created_at: timestamp
                }
                dispatch(addBookmarkState(newBookmark))
                dispatch(addBookmarkToSurah(newBookmark))
                setConfirmationPopup({ 
                    isOpen: true,
                    text: "Bookmark Added",
                    error: false
                })
            } else {
                setConfirmationPopup({ 
                    isOpen: true,
                    text: "Something went wrong",
                    error: true
                })
            }
        })
    }
    const showFootnote = (serial, text, verse) => {
        setCurrentFootnote({ serial, text, verse })
        setFootNoteOpen(true)
    }
    return (
        <div>
            {currentParagraph && <Modal 
                open={addNoteModalOpen} 
                handleClose={() => setAddNoteModalOpen(false)}
                title={`Add Note to verse (${currentParagraph.fromVerseId} to ${currentParagraph.toVerseId}) at ${surah.titleInAurabic}`}
            > 
                <TextField
                    id="outlined-multiline-static"
                    label="Write your note here"
                    multiline
                    rows={4}
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    style={{ width: '100%'}}
                />
                <Buttonbtn 
                    style={{ marginTop: '15px', backgroundColor: colors.base }}
                    disabled={addNoteLoading}
                    onClick={handleAddNote}
                > <AddIcon /> Add </Buttonbtn> { addNoteLoading && <CircularProgress size="30px" style={{ marginLeft: '15px' }}/> }
            </Modal> }
            <Modal
                open={footNoteOpen}
                handleClose={() => setFootNoteOpen(false)}
                title={'FOOTNOTES'}
            >
                <p>Verse: {currentFootnote.verse}</p>
                <p>{currentFootnote.serial}. {currentFootnote.text}</p>
            </Modal>
            {surah && <Heading colors={colors}>
                <Link to="/surah" className="back-button"><ArrowBackIcon /></Link>
                <h1 className="surah-name">The Clear Quran<span className="registered">&reg;</span></h1>
                { paragraphMode && <div className="paragraph-selector">
                    <div className="selector selected" onClick={e => scrollToParagraph(e, -1)}><InfoIcon /></div>
                    {surah.paragraphs.map(paragraph =>
                        <div className="selector" onClick={e => scrollToParagraph(e, paragraph.id)}>
                            {paragraph.fromVerseId !== paragraph.toVerseId ? `${paragraph.fromVerseId} - ${paragraph.toVerseId}` : paragraph.fromVerseId}
                        </div>
                    )}
                </div> }
                <button className="settings-button" onClick={() => setSettingsOpen(true)}><SettingsIcon /></button>
            </Heading>}
            <SettingsContainer open={settingsOpen} colors={colors}>
                {/* <button className="settingsOpenBtn" onClick={() => setSettingsOpen(true)}><SettingsIcon /></button> */}
                <div className="settings-container">
                    <h2>Settings</h2>
                    <div className="close-icon" onClick={() => setSettingsOpen(false)}><CloseIcon /></div>
                    <div className="settings-section">
                        <p className="section-title">Translations</p>
                        <div className="section-content">
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="both"
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="both" control={<Radio />} label="Both" onChange={handleTranslation} />
                                <FormControlLabel value="tcq" control={<Radio />} label="The Clear Quran" onChange={handleTranslation} />
                                <FormControlLabel value="uthmani" control={<Radio />} label="Uthmani Script" onChange={handleTranslation} />
                            </RadioGroup>
                        </div>                        
                    </div>
                    <div className="settings-section">
                        <p className="section-title">Font Size</p>
                        <div className="section-content font-change">
                            <IconButton aria-label="decrease" onClick={decreaseFontSize}><RemoveCircleIcon /></IconButton>
                            {fontSize}
                            <IconButton aria-label="increase" onClick={increaseFontSize}><AddCircleIcon /></IconButton>
                        </div>
                    </div>
                    <div className="settings-section">
                        <p className="section-title">Reading Mode</p>
                        <div className="section-content">
                            {userId === -1 || !data.user.isPaid ?
                                <FormControlLabel control={<Checkbox disabled />} label="Paragraph Mode" onChange={() => setParagraphMode(!paragraphMode)} /> :
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Paragraph Mode" onChange={() => setParagraphMode(!paragraphMode)} />
                            }
                        </div>
                    </div>
                </div>
            </SettingsContainer>
            {surah ? <Container colors={colors} fontSize={fontSize}>
                <div className="section" id="introduction">
                    <IntroductionCard 
                        intro={surah.introduction} 
                        chapterInfo={{
                            chapterId: surah.chapterId,
                            titleInEnglish: surah.titleInEnglish,
                            titleInAurabic: surah.titleInAurabic
                        }} 
                    />
                </div>
                {(surah.chapterId !== 1 && surah.chapterId !== 9) && <React.Fragment>
                    <div className="bismillah">
                        <div className="arabic">بِسْمِ ٱللّٰهِ ٱلرَّحْمٰنِ ٱلرَّحِيمِ</div>
                        <div className="english">In the name of God, the Merciful, the Compassionate</div>
                    </div>
                </React.Fragment>}
                { paragraphMode ? 
                <React.Fragment>
                {paragraphWiseVerse && paragraphWiseVerse.map(paragraph =>
                    <div id={`surah-paragraph-${paragraph.id}`} className="paragraph">
                        { showEnglish && <div className={"verse-card english-verses " + (paragraph.id === selectedParagraphId ? "selected-paragraph" : "")}>
                            <h2 className="paragraph-title">{paragraph.title}</h2>
                            <div className="action-icons">
                                <button onClick={() => addNoteAction(paragraph)}><img src={AddNoteIcon} /></button>
                                { !paragraph.isUserBookmarked && <button onClick={e => addBookmark(e, paragraph)}><img src={BookmarkIcon} /></button> }
                            </div>
                            {paragraph.verses.map(verse => verse && <span>
                                <b>({verse.verseId})</b> {verse.verseInEnglish} {verse.footNote !== "" && <button onClick={() => showFootnote(verse.footNote, verse.footNoteExplanation, verse.verseId)} className="footnote-btn"><sup>{verse.footNote}</sup></button>} &nbsp;
                            </span>)}
                        </div> }
                        { showAurabic && <div className={"verse-card arabic-verses " + (paragraph.id === selectedParagraphId ? "selected-paragraph" : "") }>
                            { !showEnglish && <React.Fragment>
                                <h2 className="paragraph-title" style={{ textAlign: 'left'}}>{paragraph.title}</h2>
                                <div className="action-icons">
                                    <button onClick={() => addNoteAction(paragraph)}><img src={AddNoteIcon} /></button>
                                    { !paragraph.isUserBookmarked && <button onClick={e => addBookmark(e, paragraph) }><img src={BookmarkIcon} /></button> }
                                </div></React.Fragment> }
                            {paragraph.verses.map(verse => verse && <span>
                                &nbsp; {verse.verseInAurabic}<b>({verse.verseId})</b>
                            </span>)}
                        </div> }
                    </div>
                )}
                </React.Fragment> :
                <div className="no-paragraph">
                    {surah.verses.map(verse => 
                    <div>
                        { showAurabic && <div className="verse arabic-verse">{verse.verseInAurabic}  <p style={{ display: 'inline-block'}}>.{verse.verseId}</p></div> }
                        { showEnglish && <div className="verse english-verse">{verse.verseId}. {verse.verseInEnglish} {verse.footNote !== "" && <button onClick={() => showFootnote(verse.footNote, verse.footNoteExplanation, verse.verseId)} className="footnote-btn"><sup>{verse.footNote}</sup></button>} </div> } 
                    </div>)}
                </div>
                }
            </Container> : 
            <LoadingContainer>
                <CircularProgress />
            </LoadingContainer>}
            <ConfirmationPopup show={confirmationPopup.isOpen} text={confirmationPopup.text} error={confirmationPopup.error} />
        </div>
    )
}
const LoadingContainer = styled.div`
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Heading = styled.div`
    background-color: ${props => props.colors.base};
    box-sizing: border-box;
    padding: 15px;
    position: sticky;
    top: 0;
    z-index: 900;
    .registered {
        font-size: 3rem;
    }
    .back-button {
        position: absolute;
        left: 10px;
        top: 10px;
        color: white;
        cursor: pointer;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background .2s ease-out;
        &:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }
    }
    .settings-button {
        border: none;
        outline: none;
        background-color: transparent;
        position: absolute;
        right: 15px;
        top: 20px;
        color: white;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background .2s ease-out;
        &:hover {
            background-color: rgba(255, 255, 255, 0.2);
        }
    }
    .surah-name {
        text-align: center;
        font-family: "TrajanPro-Regular";
        color: white;
    }
    @media screen and (max-width: 800px) {
        .surah-name {
            font-size: 1.8rem;
        }
    }
    .paragraph-selector {
        width: 90%;
        max-width: 960px;
        margin: 0 auto;
        margin-top: 10px;
        height: 80px;
        display: flex;
        gap: 5px;
        overflow-x: scroll;
        padding-bottom: 5px;
        .selector {
            height: 100%;
            aspect-ratio: 1/1;
            font-size: 0.8rem;
            background-color: rgba(255,255,255,0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            cursor: pointer;
            &:hover {
                background-color: rgba(255,255,255,0.7);
            }
        }
        .selector.selected {
            border: 3px solid ${props => props.colors.dark};
            font-weight: bold;
        }
        ::-webkit-scrollbar {
            width: 1px;
            height: 4px;
        }
        /* Track */
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.5);
            border-radius: 10px;
        }
        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
            background: rgba(255,255,255,0.7);
        }
    }
`
const Container = styled.div`
    width: 90%;
    max-width: 960px;
    margin: 0 auto;
    margin-top: 7px;
    font-size: ${props => props.fontSize}px;
    .section {
        margin-top: 7px;
        margin-bottom: 7px;
    }
    .bismillah {
        text-align: center;
        margin-bottom: 10px;
        .arabic {
            font-family: "Uthmanic-Hafs";
        }
    }
    .paragraph {
        margin-bottom: 30px;
        .selected-paragraph {
            border: 2px solid ${props => props.colors.base};
        }
        .verse-card {
            width: 100%;
            box-shadow: 0px 3px 11px rgba(0, 0, 0, 0.08);
            border-radius: 5px;
            padding: 15px;
            box-sizing: border-box;
            position: relative;
            margin-top: 5px;
            &::before {
                content: "";
                display: block;
                position: absolute;
                left: 20px;
                top: 0px;
                height: 7px;
                width: 150px;
                background-color: ${props => props.colors.base};
                border-bottom-left-radius: 20px;
                border-bottom-right-radius: 20px;
            }
            .paragraph-title {
                font-size: 1.5rem;
                margin-bottom: 15px;
            }
            .action-icons {
                position: absolute;
                right: 20px;
                top: 20px;
                display: flex;
                gap: 5px;                
                button {
                    border: none;
                    outline: none;
                    background: none;
                    cursor: pointer;
                    transition: background .2s ease-out;
                    border-radius: 50%;
                    height: 40px;
                    width: 40px;
                    img {
                        height: 25px;
                        pointer-events: none;
                    }
                    &:hover {
                        background-color: #ededed;
                    }
                }
                button.disabled {
                    pointer-events: none;
                    img {
                        filter: grayscale(100%);
                        -webkit-filter: grayscale(100%);
                    }
                }
            }
        }
        .arabic-verses {
            text-align: right;
            font-family: "Uthmanic-Hafs";
            &::before {            
                left: unset;
                right: 20px;            
            }
        }
    }
    .no-paragraph {
        .verse {
            box-sizing: border-box;
            padding: 10px;
        }
        .arabic-verse {
            font-family: "Uthmanic-Hafs";
            text-align: right;
            background-color: ${props => props.colors.lightGray};
        }
        .english-verse {
            color: ${props => props.colors.gray};
        }
    }
    .footnote-btn {
        border: none;
        outline: none;
        font-weight: bold;
        background-color: transparent;
        text-decoration: underline;
    }
`
const SettingsContainer = styled.div`
    position: fixed;
    z-index: 1001;
    right: 0px;
    top: 0px;
    bottom: 0px;
    ${props => !props.open && 'pointer-events: none'};
    .settingsOpenBtn {
        position: fixed;
        right: 20px;
        bottom: 30px;
        height: 50px;
        width: 50px;
        border: none;
        outline: none;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        pointer-events: all !important;
    }
    .settings-container {
        height: 100%;
        width: 300px;
        background-color: ${props => props.colors.lightGray};
        transition: transform .2s ease-out;
        transform: ${props => props.open ? "translateX(0px)": "translateX(300px)"};
        
        padding-top: 50px;
        h2 {
            text-align: center;
        }
        .close-icon {
            position: absolute;
            left: 10px;
            top: 10px;
            height: 32px;
            width: 32px;
            color: white;
            background-color: ${props => props.colors.base};
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .settings-section {
            width: 100%;
            .section-title {
                width: 100%;
                padding: 10px 10px;
                background-color: ${props => props.colors.gray};
                color: white;
                font-weight: bold;
            }
            .section-content {
                padding: 0px 20px;
                
            }
            .font-change {
                & > button {
                    border: none;
                    outline: none;
                }
            }
        }
    }
`
export default SurahSingle2