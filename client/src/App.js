import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import PatientDetails from './components/PatientDetails'
import { get } from './api/action'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [patientReports, setPatientReports] = useState([])

  useEffect(() => {
    get('/report')
      .then((response) => {
        setPatientReports(response)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home patientReports={patientReports} />} />
        <Route path='/:patientId' element={<PatientDetails />} />
      </Routes>
    </div>
  )
}

export default App
