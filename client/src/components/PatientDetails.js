import React from 'react'
import { useEffect, useState } from 'react'
import { Container, Table } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { get } from '../api/action'

const PatientDetails = () => {
  const [patientDetails, setPatientDetails] = useState()
  let { patientId } = useParams()

  useEffect(() => {
    const fetchPatientDetails = async () => {
      const response = await get(`/report/${patientId}`)
      setPatientDetails(response)
    }

    if (patientId) fetchPatientDetails()
  }, [patientId])

  return (
    <Container>
      {patientDetails && (
        <div>
          <h1>{patientDetails.name}</h1>
          <h5>{patientDetails.email}</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Created At</th>
                <th>Content</th>
                <th>Event</th>
              </tr>
            </thead>
            <tbody>
              {patientDetails.reports.map(
                (pdReport, i) =>
                  pdReport && (
                    <tr key={i}>
                      <td>{pdReport.reportName}</td>
                      <td>{pdReport.created}</td>
                      <td>{pdReport.content}</td>
                      <td>{pdReport.event}</td>
                    </tr>
                  )
              )}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  )
}

export default PatientDetails
