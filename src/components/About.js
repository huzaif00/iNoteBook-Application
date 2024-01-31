import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/noteContext'
const About = () => {
    const a=useContext(noteContext)
  return (<>
  <div>
  This is About page

  </div>
    </>
  )
}

export default About