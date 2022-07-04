import React from 'react'
import Navbar from '../../components/Navbar'
import { Container } from '../../Style.style'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import styled from 'styled-components'
import { ClipLoader } from 'react-spinners'

function About() {
    const about = useSelector(data => data.about)
  return (
    <div>
        <Navbar />
        { about ? 
            <Container>
                <h1 style={{ textAlign: 'center', marginTop: '20px' }}>About</h1>
                {about.description}
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
export default About