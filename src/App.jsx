import React from 'react'
import SignupPage from './pages/SignupPage'
import Navbar from './components/NavBar'
import {BrowserRouter as Router} from 'react-router-dom'
import UserDashboard from './pages/UserDashboard'

const App = () => {
  return (
   <Router>
    <Navbar />
    <UserDashboard/>
   </Router>

  )
}

export default App