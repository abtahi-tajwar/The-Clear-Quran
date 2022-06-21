import React from 'react'
import Navbar from '../../components/Navbar'
import styled from 'styled-components'
import { Container, Grid } from '../../Style.style'
import SurahCard from '../../components/SurahCard'

function Surah() {
  return (
    <Wrapper>
        <Navbar />
        <Container style={{ marginTop: '30px'}}>
          <Grid width="350px" gap="30px">
            <SurahCard />
            <SurahCard />
            <SurahCard />  
            <SurahCard />
            <SurahCard />
            <SurahCard />  
            <SurahCard />
            <SurahCard />
            <SurahCard />            
            <SurahCard />
            <SurahCard />
            <SurahCard />  
          </Grid>
        </Container>
    </Wrapper>
  )
}
const Wrapper = styled.div`
    width: 100%;
`
export default Surah