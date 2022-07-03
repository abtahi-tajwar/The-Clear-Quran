import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Flex, colors } from '../Style.style'
import styled from 'styled-components'
import QuranInfo from './QuranInfo'
import GlobalSearch from './GlobalSearch'
import InfoIcon from '@mui/icons-material/Info';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';

function Navbar() {
  const [isInfoOpen, setIsInfoOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")
  const [globalSearchOpen, setGlobalSearchOpen] = React.useState(false)
  return (
    <React.Fragment>
    <Wrapper>      
      <Container>
        <Flex gap="30px" className="full-size">
          <Link to="/"><HomeIcon /></Link>
          <h1>THE CLEAR QURAN</h1>
          <div className='search-container'>
              <i className="fa-solid fa-magnifying-glass" onClick={() => setGlobalSearchOpen(true)}></i>
              <input 
                type="text" 
                className="nav-search" 
                placeholder='Search...' 
                onChange={e => setSearch(e.target.value)}
              />
          </div>
          <Flex className="menu-link" gap="10px">
            <Link to="/profile"><PersonIcon /> </Link>
            <Link to="/notes"><NoteAltIcon /></Link>
            <div className="quran_info" onClick={() => setIsInfoOpen(true)}><InfoIcon /></div>
          </Flex>          
        </Flex>
      </Container>      
    </Wrapper>
    <QuranInfo open={isInfoOpen} handleClose={() => setIsInfoOpen(false)} />
    <GlobalSearch search={search} open={globalSearchOpen} handleClose={() => setGlobalSearchOpen(false)} />
    </React.Fragment>
  )
}
const Wrapper = styled.div`
  width: 100%;
  height: 94px;
  background-color: ${colors.base};
  color: white;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  z-index: 900;
  h1 {
    font-family: "TrajanPro-Regular";
    line-height: 0px;
    margin-bottom: 0px;
    font-size: 2vw;
  }
  a, .quran_info {
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
  }
  & > div {
    height: 100%;
  }
  .search-container {
    flex: 1;
    border-radius: 35px;
    background-color: ${colors.dark};
    box-sizing: border-box;
    padding: 10px 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    & > i {
      cursor: pointer;
    }
    & > input {
      border: none;
      outline: none;
      background: transparent;
      color: white;
      flex: 1;
    }
  }

  @media only screen and (max-width: 680px) {
    .search-container {
      display: none;
    }
    h1 {
      font-size: 4vw;
    }
  }
`
export default Navbar