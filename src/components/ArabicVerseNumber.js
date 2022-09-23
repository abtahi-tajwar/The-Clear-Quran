import React from 'react'

function ArabicVerseNumber({ number }) {

    const arabicNumbers = ['٠', '١' , '٢' , '٣', '٤' , '٥', '٦', '٧', '٨', '٩']
    let finalNumber = ''
    let currentNumber = number
    while (currentNumber !== 0) {
        finalNumber = `${arabicNumbers[currentNumber%10]}${finalNumber}`
        currentNumber = parseInt(currentNumber/10)
    }
  return (
    <b>{ finalNumber }</b>
  )
}

export default ArabicVerseNumber