/* eslint-disable react/prop-types */
import React from 'react'
import Marquee from "react-fast-marquee";
const App = ({text}) => {
  return (
    <Marquee>
        {text}
    </Marquee>
  )
}

export default App