import styled from 'styled-components'
export const colors = {
    base: '#461E27',
    baseLight: '#692937',
    dark: '#210F13'
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