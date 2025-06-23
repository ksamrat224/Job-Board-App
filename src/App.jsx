import React from 'react'
import SignupPage from './pages/SignupPage'
import Navbar from './components/NavBar'
import {BrowserRouter as Router} from 'react-router-dom'
import UserDashboard from './pages/UserDashboard'
import EmployerDashboard from './pages/EmployerDashboard'
import JobListingsPage from './pages/JobListingsPage'
import JobDetailPage from './pages/JobDetailPage'

const App = () => {
  return (
   <Router>
<JobDetailPage/>
   </Router>

  )
}

export default App