import React from 'react'
import countryCodes from '../countryCodes.json'
import ReactCountryFlag from "react-country-flag"
import Select from 'react-select'
import styled from 'styled-components'


function NumberWithCountryCode({ setDialCode }) {
    const [currentCountry, setCurrentCountry] = React.useState({ 
        name: "Bangladesh", 
        flag: "🇧🇩", 
        code: "BD", 
        dial_code: "+880" 
    })
    const options = countryCodes.map(c => ({ 
        value: c.name.toLowerCase(), 
        label: <div><ReactCountryFlag countryCode={c.code} svg /> {c.name}</div> 
    }))
    const handleChange = (option) => {
        setCurrentCountry(countryCodes.find(country => country.name.toLocaleLowerCase() === option.value))
        setDialCode(currentCountry.dial_code)
    }
  return (
    <Wrapper> 
        <div className="dial-code">
            <ReactCountryFlag countryCode={currentCountry.code} svg />
            <span>{currentCountry.dial_code}</span>
        </div> 
        
        <Select 
            options={options} 
            value={options.filter(function(option) {
                return option.value === currentCountry.name.toLowerCase();
            })}
            onChange={handleChange} 
            className="select"
        />
    </Wrapper>
  )
}

const Wrapper = styled.div`
    display: flex;
    .dial-code {
        padding: 0px 15px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .select {
        flex: 1;
    }
`

export default NumberWithCountryCode