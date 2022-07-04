import React from 'react'
import styled from 'styled-components'
import Navbar from '../../components/Navbar'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { colors } from '../../Style.style'
import { routes, headers } from '../../routes'
import Modal from '../../components/Modal'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios'
import ConfirmationPopup from '../../components/ConfirmationPopup'
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Checkbox from '@mui/material/Checkbox';
import InfoIcon from '@mui/icons-material/Info';



function SurahSingle() {
    const {id} = useParams()
    const [surah, setSurah] = React.useState()
    const [verses, setVerses] = React.useState()
    const [currentParagraph, setCurrentParagraph] = React.useState()
    const [addNoteModalOpen, setAddNoteModalOpen] = React.useState(false)
    const [leftNavOpen, setLeftNavOpen] = React.useState(false)
    const [settingsOpen, setSettingsOpen] = React.useState(false)
    const [note, setNote] = React.useState()
    const [showAurabic, setShowAurabic] = React.useState(true)
    const [showEnglish, setShowEnglish] = React.useState(true)
    const [paragraphMode, setParagraphMode] = React.useState(true)
    const [fontSize, setFontSize] = React.useState(16)
    const [showIntro, setShowIntro] = React.useState(true)
    const [ confirmationPopup, setConfirmationPopup ] = React.useState({
        isOpen: false,
        text: "",
        error: false
    })
    const allData = useSelector(data => data)
    const data = allData.surah ? allData.surah : null
    const userId = allData.user ? allData.user.userId : null
    
    React.useEffect(() => {
        if (data.length > 0) {
            console.log("Data", data)
            const singleSurah = data.find(item => item.chapterId === parseInt(id))
            setSurah(singleSurah)
            // Load the first paragraph when user enter
            setCurrentParagraph(singleSurah.paragraphs[0])
            manageSurahView(singleSurah.paragraphs[0].fromVerseId, singleSurah.paragraphs[0].toVerseId, singleSurah )
        }        
    }, [data])
    const manageSurahView = (from, to, currentSurah) => {
        let current = [] 
        for(let i = from; i <= to; i++) {
            current.push(currentSurah.verses.find(item => item.verseId === i))
        }
        setVerses(current)
    }
    const handleParagraphSelector = (id, from, to, intro=false) => {
        if (!intro) {
            setShowIntro(false)
            if(surah) setCurrentParagraph(surah.paragraphs.find(item => item.id === id))        
            document.querySelectorAll(".selector").forEach(item => item.classList.remove('reading'))
            document.getElementById(`surah-paragraph-selector-${id}`).classList.add('completed')
            document.getElementById(`surah-paragraph-selector-${id}`).classList.add('reading')
            manageSurahView(from, to, surah)
        } else {            
            document.querySelectorAll(".selector").forEach(item => item.classList.remove('reading'))
            document.getElementById(`introduction`).classList.add('reading')
            setShowIntro(true)
        }
        
    }
    const handleNavToggle = () => {
        setLeftNavOpen(!leftNavOpen)
    }
    const handleAddNoteModalOpen = () => setAddNoteModalOpen(true) 
    const handleAddNoteModalClose = () => setAddNoteModalOpen(false)
    const handleNote = (e) => {
        setNote(e.target.value)
    }
    const handleAddNote = () => {
        axios.post(routes.createNote, {
            id: 0,
            chapterId: surah.chapterId,
            paragraphId: currentParagraph.id,
            userId: userId,
            note
        }, {
            headers: headers
          }).then(response => {
            setNote("")
            setAddNoteModalOpen(false)
            if (response.data.status === "Success") {
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

    const addBookmark = () => {
        axios.post(routes.addBookmark, {
            paragraphId: currentParagraph.id,
            userId: userId
        }).then(response => {
            if (response.data.status === "Success") {
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
    return (
        <Wrapper fontSize={fontSize}>
            {/* Modal to add notes for surah paragraphs */}
            { currentParagraph && 
                <Modal 
                    open={addNoteModalOpen} 
                    handleClose={handleAddNoteModalClose}
                    title={`Add Note to verse (${currentParagraph.fromVerseId} to ${currentParagraph.toVerseId}) at ${surah.titleInAurabic}`}
                > 
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
                        endIcon={<AddIcon />}
                        onClick={handleAddNote}
                    > Add </Button>
                </Modal>
            }
            <Navbar />
            <SettingsContainer open={settingsOpen}>
                <button className="settingsOpenBtn" onClick={() => setSettingsOpen(true)}><SettingsIcon /></button>
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
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Paragraph Mode" onChange={() => setParagraphMode(!paragraphMode)} />
                        </div>
                    </div>
                </div>
            </SettingsContainer>
            { paragraphMode && 
                <React.Fragment>
                    <button className={leftNavOpen ? 'collapse-toggle' : 'collapse-toggle collapse-toggle-closed'} onClick={handleNavToggle}><i class="fa-solid fa-bars"></i></button> 
                    <div className={leftNavOpen ? 'navigation' : 'navigation navigation-closed'}>                                               
                        <div className="nav-container">                     
                            <Link className="go-back" to="/surah"><i class="fa-solid fa-circle-arrow-left"></i> Go Back</Link>
                            {surah && <div className="selector" id={"introduction"} onClick={() => handleParagraphSelector(null, null, null, true)}>
                                <InfoIcon />
                            </div>}
                            {surah && surah.paragraphs.map(p => 
                                <div className="selector" id={`surah-paragraph-selector-${p.id}`} key={p.id} onClick={() => handleParagraphSelector(p.id, p.fromVerseId, p.toVerseId)}>
                                    {p.fromVerseId !== p.toVerseId ?  <span>{p.fromVerseId} - {p.toVerseId}</span> : p.fromVerseId }
                                </div>
                            )}
                        </div>
                    </div> 
                </React.Fragment>
            }
            <div className="content-container">
                { surah && <h1 className="chapter-name">{ surah.titleInAurabic } ({ surah.titleInEnglish })</h1> }
                <div className="action-buttons">
                    <div><Link to="/surah" className="go-back"><i class="fa-solid fa-circle-arrow-left"></i> Go Back </Link></div>
                    <div>
                        <button className="action-button" onClick={addBookmark}><i class="fa-solid fa-bookmark"></i> Bookmark </button>
                        <button className="action-button" onClick={handleAddNoteModalOpen}><i class="fa-solid fa-pen-to-square"></i> Add Note</button>
                    </div>
                </div>
                {paragraphMode ? 
                <React.Fragment>
                    { showIntro ? 
                    <div className="introduction-container">
                        <h3>Introduction</h3>
                        { surah && <p>{surah.introduction}</p>}
                    </div> :
                    <React.Fragment>
                        { (showAurabic && showEnglish) && <div className="content">
                            { verses && 
                            verses.map(verse => <div key={verse.verseId}>
                                <div className="arabic"><span className="ayat-marking">{verse.verseId}</span> {verse.verseInAurabic} </div>
                                <div className="english">{verse.verseInEnglish} <span className="ayat-marking">{verse.verseId}</span> </div>
                            </div>) }
                        </div> }
                        { (showAurabic && !showEnglish) && <div className="content">
                            <div className="arabic reading">
                                { verses && 
                                verses.map(verse => <React.Fragment key={verse.verseId}>
                                    <span className="ayat-marking">{verse.verseId}</span> {verse.verseInAurabic}
                                </React.Fragment>) }
                            </div>
                        </div> }
                        { (!showAurabic && showEnglish) && <div className="content">
                            <div className="reading">
                                { verses && 
                                verses.map(verse => <React.Fragment key={verse.verseId}>
                                    <span className="ayat-marking">{verse.verseId}</span> {verse.verseInEnglish}
                                </React.Fragment>) }
                            </div>
                        </div> }
                    </React.Fragment>}
                </React.Fragment> :
                <React.Fragment>
                    { (showAurabic && showEnglish) && <div className="content">
                        { surah && 
                        surah.verses.map(verse => <div key={verse.verseId}>
                            <div className="arabic"><span className="ayat-marking">{verse.verseId}</span> {verse.verseInAurabic} </div>
                            <div className="english">{verse.verseInEnglish} <span className="ayat-marking">{verse.verseId}</span> </div>
                        </div>) }
                    </div> }
                    { (showAurabic && !showEnglish) && <div className="content">
                        <div className="arabic reading">
                            { surah && 
                            surah.verses.map(verse => <React.Fragment key={verse.verseId}>
                                {verse.verseInAurabic}<span className="ayat-marking">{verse.verseId}</span>
                            </React.Fragment>) }
                        </div>
                        
                    </div> }
                    { (!showAurabic && showEnglish) && <div className="content">
                        <div className="reading">
                            { surah && 
                            surah.verses.map(verse => <React.Fragment key={verse.verseId}>
                                <span className="ayat-marking">{verse.verseId}</span> {verse.verseInEnglish}
                            </React.Fragment>) }
                        </div>
                    </div> }
                </React.Fragment>
                }
            </div>
            <ConfirmationPopup show={confirmationPopup.isOpen} text={confirmationPopup.text} error={confirmationPopup.error} />
        </Wrapper>
    )
}
const Wrapper = styled.div`
    width: 100%;
    .container {
        width: 100%;
    }
    .collapse-toggle {
        position: absolute;
        left: 350px;
        top: 120px;
        padding: 10px 20px;
        z-index: 1000;
        transition: transform .2s ease-out;
    }
    .collapse-toggle-closed {
        transform: translateX(-340px);
    }
    .navigation-closed {
        transform: translateX(-100%);
    }
    .navigation {
        width: 340px;
        height: 100vh;
        position: fixed;
        background-color: #D9D9D9;
        overflow-y: scroll;
        padding-bottom: 100px;
        transition: transform .2s ease-out;
        ::-webkit-scrollbar {
            width: 5px;
        }
        /* Track */
        ::-webkit-scrollbar-track {
            background: transparent;
        }
        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: ${colors.base};
            border-radius: 20px;
        }
        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
            background: ${colors.baseLight};
        }
        .selector {
            aspect-ratio: 1/1;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.9rem;
            border-radius: 4px;
            box-shadow: 0px 3px 11px rgba(0, 0, 0, 0.08);
            transition: all .2s ease-out;
            cursor: pointer;
            border: 2px solid ${colors.base};
            &:hover {
                box-shadow: 0px 3px 11px rgba(0, 0, 0, 0.29);
            }
        } 
        .nav-container {
            width: 100%;
            padding: 20px;
            display: grid;
            grid-gap: 15px;
            grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
            grid-template-rows: auto;  
            .completed {
                background-color: #D9D9D9;
            }            
            
            .reading {
                background-color: ${colors.base} !important;
                color: white !important;
                font-weight: bold !important;
            }
        }
        
    }
    .content-container {
        width: 90%;
        max-width: 1200px;
        margin: 0 auto;
        .introduction-container {
            margin-top: 30px;
        }
        .chapter-name {
            text-align: center;
            margin-top: 15px;
            font-size: 1.7rem;
            font-family: "TrajanPro-Regular";
        }
        .action-buttons {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            & > div {
                display: flex;
                gap: 5px;
            }
            .action-button {
                padding: 5px 10px;
                color: white;
                background-color: ${colors.base};
                border: none;
                outline: none;
                border-radius: 5px;
                transition: background .2s ease-out;
                &:hover {
                    background-color: ${colors.baseLight};
                }
            }
        }
        .content {
            margin-top: 50px;
            overflow: auto;
            font-size: ${props => props.fontSize ? props.fontSize+"px" : '16px'};
            & > div {
                padding: 30px;
                border-bottom: 1px solid black;
            }
            .arabic {
                text-align: right;
            }
            .ayat-marking {
                border: 1px solid black;
                border-radius: 50%;
                height: 20px;
                width: 20px;
                display: inline-block;
                text-align: center;
                font-size: 0.7rem;
                margin: 0px 5px;
                line-height: 1rem;
            }
            .reading {
                line-height: 4rem;
                .ayat-marking {
                    padding: 1px 5px !important;
                    display: inline !important;
                }
            }
        }
    }
    

`
const SettingsContainer = styled.div`
    position: fixed;
    z-index: 1001;
    right: 0px;
    top: 0px;
    bottom: 0px;
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
    }
    .settings-container {
        height: 100%;
        width: 300px;
        background-color: ${colors.lightGray};
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
            background-color: ${colors.base};
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
                background-color: ${colors.gray};
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
export default SurahSingle