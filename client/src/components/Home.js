import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Table } from 'react-bootstrap'

const Home = ({ patientReports }) => {
  let navigate = useNavigate()

  const openPatientDetails = (patientId) => {
    navigate(patientId)
  }

  return (
    <Container>
      <h1>Patient Reports App</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Registered</th>
            <th>E-mail</th>
            <th>Gender</th>
            <th>Reports</th>
          </tr>
        </thead>
        <tbody>
          {patientReports.map(
            (pReport, i) =>
              pReport && (
                <tr key={i} onClick={() => openPatientDetails(pReport.id)}>
                  <td>{pReport.name}</td>
                  <td>{pReport.registered}</td>
                  <td>{pReport.email}</td>
                  <td>{pReport.gender}</td>
                  <td>{pReport.reports.length}</td>
                </tr>
              )
          )}
        </tbody>
      </Table>
    </Container>
  )
}

export default Home
