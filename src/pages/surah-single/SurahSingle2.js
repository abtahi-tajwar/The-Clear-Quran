import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import styled from 'styled-components'
import IntroductionCard from '../../components/IntroductionCard'

function SurahSingle2() {
    const { id } = useParams()
    const data = useSelector(data => data)
    const allSurah = data.surah
    const colors = data.settings.colors

    const [surah, setSurah] = React.useState()    
    const [paragraphWiseVerse, setParagraphWiseVerse] = React.useState()
    
    React.useEffect(() => {
        setSurah(allSurah.find(s => s.chapterId === parseInt(id)))
    }, [allSurah])
    React.useEffect(() => {
        if(surah) {
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
    React.useEffect(() => {
        console.log("Paragraph Wise Verse", paragraphWiseVerse)
    }, [paragraphWiseVerse])
    return (
        <div>
            <Heading colors={colors}>
                <h1 className="surah-name">{surah.titleInEnglish} ({surah.titleInAurabic})</h1>
            </Heading>
            {surah && <Container colors={colors}>
                <div className="section">
                    <IntroductionCard intro={surah.introduction}/>
                </div>
                {paragraphWiseVerse && paragraphWiseVerse.map(paragraph => 
                    <div id={`surah-paragraph-${paragraph.id}`} className="paragraph">
                        <div className="verse-card english-verses">
                            <h2 className="paragraph-title">{paragraph.title}</h2>
                            {paragraph.verses.map(verse => <span>
                                <b>({verse.id})</b> {verse.verseInEnglish} &nbsp;
                            </span>)}
                        </div>
                        <div className="verse-card arabic-verses">
                            {paragraph.verses.map(verse => <span>
                                &nbsp;{verse.verseInAurabic}<b>({verse.id})</b>
                            </span>)}
                        </div>
                    </div>
                )}
            </Container>}
        </div>
    )
}
const Heading = styled.div`
    background-color: ${props => props.colors.base};
    box-sizing: border-box;
    padding: 15px;
    .surah-name {
        text-align: center;
        font-family: "TrajanPro-Regular";
        color: white;
    }
`
const Container = styled.div`
    width: 90%;
    max-width: 960px;
    margin: 0 auto;
    margin-top: 7px;
    .section {
        margin-top: 7px;
        margin-bottom: 7px;
    }
    .paragraph {
        margin-bottom: 30px;
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
        }
        .arabic-verses {
            text-align: right;
            &::before {            
                left: unset;
                right: 20px;            
            }
        }
    }
    
    
    @media screen and (max-width: 800px) {
        .surah-name {
            font-size: 1.8rem;
        }
    }
`
export default SurahSingle2