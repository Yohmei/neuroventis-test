import { useEffect, useState } from 'react'
import { create_subject } from '../subject'

const patientReportsSubject = create_subject()
export const patientReportsObservable = patientReportsSubject.add_observable()

export const usePatientReports = () => {
  const [patientReports, setPatientReports] = useState([])

  useEffect(() => {
    const patientReportsObserver = patientReportsObservable.subscribe((token) => {
      setPatientReports(token)
    })

    return () => patientReportsObserver.unsubscribe()
  }, [])

  return patientReports
}
