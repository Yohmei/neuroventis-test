import { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { get } from './api/action';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [patientReports, setPatientReports] = useState([]);

  useEffect(() => {
    get('/report')
      .then(response => {
        setPatientReports(response);
      })
      .catch(err => { console.error(err); })
  }, []);

  return (
    <div className="App">
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
            {
              patientReports.map(pReport => pReport &&
                <tr>
                  <td>{pReport.name}</td>
                  <td>{pReport.registered}</td>
                  <td>{pReport.email}</td>
                  <td>{pReport.gender}</td>
                  <td>{pReport.reports.length}</td>
                </tr>)
            }
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default App;
