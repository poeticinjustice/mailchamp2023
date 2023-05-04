import React, { Fragment, useEffect, useContext } from 'react'
import ReportListItem from './ReportListItem'
import Spinner from '../layout/Spinner'
import MailchimpContext from '../../context/mailchimp/mailchimpContext'

const Reports = () => {
  const mailchimpContext = useContext(MailchimpContext)

  const { loading, reports, getReports } = mailchimpContext

  useEffect(() => {
    getReports()
    // eslint-disable-next-line
  }, [])

  if (loading || !reports.reports) {
    return <Spinner />
  } else {
    return (
      <Fragment>
        <table>
          <caption></caption>
          <thead>
            <tr>
              <th>Campaign Name</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Sent</th>
              {/* <th>No LSA</th> */}
              <th>Inc LSA</th>
            </tr>
          </thead>
          <tbody>
            {reports.reports.map((report) => (
              <ReportListItem key={report.id} report={report} />
            ))}
          </tbody>
        </table>
      </Fragment>
    )
  }
}

export default Reports
