import React from 'react'
import SignupPage from './pages/SignupPage'
import Navbar from './components/NavBar'
import {BrowserRouter as Router} from 'react-router-dom'
import UserDashboard from './pages/UserDashboard'
import EmployerDashboard from './pages/EmployerDashboard'
import JobListingsPage from './pages/JobListingsPage'

const App = () => {
  return (
   <Router>
   <JobListingsPage/>
   </Router>

  )
}

export default App