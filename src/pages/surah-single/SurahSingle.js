import React from 'react'
import styled from 'styled-components'
import Navbar from '../../components/Navbar'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { colors } from '../../Style.style'

function SurahSingle() {
    const {id} = useParams()
    const [surah, setSurah] = React.useState()
    const [verses, setVerses] = React.useState()
    const [leftNavOpen, setLeftNavOpen] = React.useState(false)
    const data = useSelector(data => data.surah)
    
    React.useEffect(() => {
        const singleSurah = data.find(item => item.chapterId === parseInt(id))
        setSurah(singleSurah)
        // Load the first paragraph when user enter
        manageSurahView(singleSurah.paragraphs[0].fromVerseId, singleSurah.paragraphs[0].toVerseId, singleSurah )
    }, [data])
    const manageSurahView = (from, to, currentSurah) => {
        let current = [] 
        for(let i = from; i <= to; i++) {
            current.push(currentSurah.verses.find(item => item.verseId === i))
        }
        setVerses(current)
    }
    const handleParagraphSelector = (id, from, to) => {
        document.querySelectorAll(".selector").forEach(item => item.classList.remove('reading'))
        document.getElementById(`surah-paragraph-selector-${id}`).classList.add('completed')
        document.getElementById(`surah-paragraph-selector-${id}`).classList.add('reading')
        manageSurahView(from, to, surah)
    }
    const handleNavToggle = () => {
        setLeftNavOpen(!leftNavOpen)
    }
    return (
        <Wrapper>
            <Navbar />
            <button className={leftNavOpen ? 'collapse-toggle' : 'collapse-toggle collapse-toggle-closed'} onClick={handleNavToggle}><i class="fa-solid fa-bars"></i></button> 
            <div className={leftNavOpen ? 'navigation' : 'navigation navigation-closed'}>                                               
                <div className="nav-container">                     
                    <Link className="go-back" to="/surah"><i class="fa-solid fa-circle-arrow-left"></i> Go Back</Link>
                    {surah && surah.paragraphs.map(p => 
                        <div className="selector" id={`surah-paragraph-selector-${p.id}`} onClick={() => handleParagraphSelector(p.id, p.fromVerseId, p.toVerseId)}>
                            {p.fromVerseId !== p.toVerseId ?  <span>{p.fromVerseId} - {p.toVerseId}</span> : p.fromVerseId }
                        </div>
                    )}
                </div>
            </div>
            <div className="content-container">
                <div className="action-buttons">
                    <div><Link to="/surah" className="go-back"><i class="fa-solid fa-circle-arrow-left"></i> Go Back </Link></div>
                    <div>
                        <button className="action-button"><i class="fa-solid fa-bookmark"></i> Bookmark </button>
                        <button className="action-button"><i class="fa-solid fa-note"></i> Add Note</button>
                    </div>
                </div>
                <div className="content">
                    { verses && 
                    verses.map(verse => <div>
                        <div className="arabic"><span className="ayat-marking">{verse.verseId}</span> {verse.verseInAurabic} </div>
                        <div className="english">{verse.verseInEnglish}</div>
                    </div>) }
                </div>
            </div>
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
            grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
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
        .action-buttons {
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            .action-button {
                padding: 5px 10px;
                color: white;
                background-color: ${colors.base};
            }
        }
        .content {
            margin-top: 50px;
            overflow: auto;
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
            }
        }
    }
    

`
export default SurahSingle