import React from 'react'
import styled from 'styled-components'
import Navbar from '../../components/Navbar'

function SurahSingle() {
  return (
    <Wrapper>
        <Navbar />
        <div className="navigation">
            <div className="container">
                <div className="selector">1</div>
                <div className="selector">3-4</div>
                <div className="selector">5-6</div>
                <div className="selector">7-8</div>
                <div className="selector">9-10</div>
            </div>            
        </div>
        <div className="container">            
            <div className="content">

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
    .navigation {
        width: 340px;
        height: 100vh;
        position: fixed;
        background-color: #D9D9D9;
        overflow-y: scroll;
        .container {
            width: 100%;
            padding: 20px;
            display: grid;
            grid-gap: 15px;
            grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
            grid-template-rows: auto;  
            .selector {
                aspect-ratio: 1/1;
                background-color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 1.3rem;
                border-radius: 4px;
                box-shadow: 0px 3px 11px rgba(0, 0, 0, 0.08);
                transition: all .2s ease-out;
                cursor: pointer;
                &:hover {
                    box-shadow: 0px 3px 11px rgba(0, 0, 0, 0.29);
                }
            }  
            
        }
        
    }

`
export default SurahSingle