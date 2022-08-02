import React from 'react'
import Navbar from '../../components/Navbar'
import { Container } from '../../Style.style'
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';
import SearchCard from '../../components/SearchCard';
function Search() {
    const data = useSelector(data => data.surah)
    const [searchResult, setSearchResult] = React.useState([])
    const [searchKeyword, setSearchKeyword] = React.useState("")

    const debounce = (callback, delay=1000) => {
        let timeout
        return (...args) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                callback(...args)
            }, delay)
        }
    }
    const updateDebounce = debounce(keyword => {
        searchSurah(keyword)
        setSearchKeyword(keyword)
    })
    const handleSearch = (e) => {
        const keyword = e.target.value.trim()
        updateDebounce(keyword)
    }
    const searchSurah = (keyword) => {
        if (data) {
            let result = []
            if (keyword !== "") {
                data.forEach(chapter => {
                    const selectedVerses = chapter.verses.filter(verse => {
                        if (verse.verseInEnglish) {
                            if (verse.verseInEnglish.toLowerCase().includes(" "+keyword.toLowerCase()) || verse.verseInEnglish.toLowerCase().includes(" "+keyword.toLowerCase()+" ") || verse.verseInEnglish.toLowerCase().includes(keyword.toLowerCase()+" ")) {
                                return true
                            }
                        }                    
                        return false
                    })
                    if (selectedVerses.length > 0) {
                        result.push({
                            chapterId: chapter.chapterId,
                            chapter: chapter.titleInAurabic,
                            chapterEnglish: chapter.titleInEnglish,
                            verses: selectedVerses
                        })
                    }
                })
                setSearchResult(result)
            } else {
                setSearchResult([])
            }
            
        }
    }
    
    return (
        <div>
            <Navbar />
            <Container style={{ marginTop: '30px' }}>
                <h2>Search The Quran</h2>
                <TextField
                    id="outlined-basic"
                    label="Search"
                    style={{ width: '100%', maxWidth: "500px" }}
                    variant="outlined"
                    name="search"
                    onChange={handleSearch}
                />
                { searchResult.map(item => <SearchCard data={item} keyword={searchKeyword} /> ) }
            </Container>
        </div>
    )
}

export default Search