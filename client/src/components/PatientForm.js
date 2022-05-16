import React from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { useState } from 'react'
import { post } from '../api/action'

const PatientForm = ({ setPatientDetails, patientId }) => {
  const [state, setState] = useState({ reportName: '', content: '', event: '' })
  const [placeholder, setPlaceholder] = useState({ reportName: 'Report Name', content: 'Content', event: 'Event' })

  const handleChange = (event) => {
    const value = event.target.value

    setState({
      ...state,
      [event.target.name]: value,
    })
  }

  const submitForm = async (event) => {
    event.preventDefault()

    const response = await post(`/report/${patientId}`, state)
    console.log(response.message)
    if (response.statusCode === 200) setPatientDetails(response.message)
    else if (response.statusCode === 400) {
      let newPlaceholderState = {}

      for (let msg of response.message) {
        newPlaceholderState = {
          ...newPlaceholderState,
          [Object.keys(msg)[0]]: msg[Object.keys(msg)[0]],
        }
      }

      setPlaceholder(newPlaceholderState)
    }
  }

  return (
    <Container>
      <h3>Add New Report</h3>
      <Form onSubmit={submitForm}>
        <Row>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder={placeholder.reportName}
                name='reportName'
                value={state.reportName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xs={7}>
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder={placeholder.content}
                name='content'
                value={state.content}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Control
                type='text'
                placeholder={placeholder.event}
                name='event'
                value={state.event}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default PatientForm
