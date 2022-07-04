import styled from 'styled-components'
export const colors = {
    base: '#461E27',
    baseLight: '#692937',
    dark: '#210F13',
    gray: '#7d7d7d',
    lightGray: '#f7f7f7'
}
export const Container = styled.div`
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
`
export const Flex = styled.div`
    display: flex;
    ${props => props.direction && `flex-direction: ${props.direction}`};
    ${props => props.gap && `gap: ${props.gap}`};
    justify-content: ${props => props.justify ? props.justify : 'center'};
    align-items: ${props => props.align ? props.align : 'center'};
`
export const Grid = styled.div`
    display: grid;
    height: ${props => props.height ? props.height : '150px'};
    grid-template-columns: repeat(auto-fill, minmax(${props=>props.width ? props.width : '150px'}, 1fr));
    grid-gap: ${props => props.gap ? props.gap : '10px'};
    grid-template-rows: auto;
`
export const ButtonLink = styled.button`
    text-decoration: none;
    padding: 6px 16px;
    background-color: ${props => props.bgColor ? props.bgColor : colors.base };
    color: ${props => props.color ? props.color : 'white'};
    border-radius: 5px;
`

export const Buttonbtn = styled.button`
    border: none;
    outline: none;
    padding: 9px 16px;
    background-color: ${props => props.bgColor ? props.bgColor : colors.base };
    color: ${props => props.color ? props.color : 'white'};
    border-radius: 5px;
    transition: background .2s ease-out;
    ${props => props.disabled && `
        pointer-events: none; 
        color: gray;
    `};
    &:hover {
        background-color: ${props => props.hoverBgColor ? props.hoverBgColor : colors.baseLight };
    }
`