import React, { Fragment, useEffect, useContext } from 'react'
import ReportListItem2 from './ReportListItem2'
import Spinner from '../layout/Spinner'
import MailchimpContext from '../../context/mailchimp/mailchimpContext'

const Reports2 = () => {
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
              <th>Sent</th>
              <th>Total Sent</th>
              <th>Total Clicks</th>
              <th>Special Report</th>
            </tr>
          </thead>
          <tbody>
            {reports.reports.map((report) => (
              <ReportListItem2 key={report.id} report={report} />
            ))}
          </tbody>
        </table>
      </Fragment>
    )
  }
}

export default Reports2
