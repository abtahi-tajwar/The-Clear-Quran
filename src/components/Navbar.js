import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Flex, colors } from '../Style.style'
import styled from 'styled-components'

function Navbar() {
  return (
    <Wrapper>
      <Container>
        <Flex gap="30px" className="full-size">
          <Link to="/"><i class="fa-solid fa-house"></i></Link>
          <h1>THE CLEAR QURAN</h1>
          <div className='search-container'>
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="text" className="nav-search" placeholder='Search...' />
          </div>
          <Flex className="menu-link" gap="10px">
            <Link to="/"><i class="fa-solid fa-user"></i></Link>
            <Link to="/"><i class="fa-solid fa-notes"></i></Link>
            <Link to="/"><i class="fa-solid fa-basket-shopping"></i></Link>
          </Flex>          
        </Flex>
      </Container>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 100%;
  height: 94px;
  background-color: ${colors.base};
  color: white;
  h1 {
    font-family: "TrajanPro-Regular";
    line-height: 0px;
    margin-bottom: 0px;
  }
  a {
    color: white;
    font-size: 1.5rem;
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
    & > input {
      border: none;
      outline: none;
      background: transparent;
      color: white;
      flex: 1;
    }
  }
`
export default Navbar