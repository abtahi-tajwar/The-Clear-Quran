import React from 'react'
import styled from 'styled-components'

function ConfirmationPopup({ show, text, error }) {
    const [isVisible, setIsVisible] = React.useState(show)
    React.useEffect(() => {
        setIsVisible(show)
        setTimeout(() => {
            setIsVisible(false)
        }, 2000)
    }, [show])
  return (
    <Wrapper show={isVisible} error={error}>
        {text}
    </Wrapper>
  )
}
const Wrapper = styled.div`
    padding: 20px 40px;
    background-color: ${props => !props.error ? '#affab3' : '#faafaf' };
    max-width: 400px;
    position: fixed;
    left: 50%;
    bottom: 40px;
    transition: .2s ease-in;
    z-index: 20000;
    transform: ${props => props.show ? `translateX(-50%)` : `translate(-50%, 200%)`};
`
export default ConfirmationPopup