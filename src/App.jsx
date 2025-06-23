import React from 'react'
import SignupPage from './pages/SignupPage'
import Navbar from './components/NavBar'
import {BrowserRouter as Router} from 'react-router-dom'

const App = () => {
  return (
   <Router>
    <Navbar />
   </Router>

  )
}

export default App