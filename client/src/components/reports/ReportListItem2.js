import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ReportListItem2 = ({
  report: { id, campaign_title, subject_line, send_time, emails_sent, clicks },
}) => {
  const sendDate = new Date(send_time).toDateString()
  const sendTime = new Date(send_time).toLocaleTimeString('EDT')

  return (
    <Fragment>
      <tr>
        <td>{campaign_title}</td>
        <td>{subject_line}</td>
        <td>
          {sendDate} at {sendTime}
        </td>
        <td>{emails_sent.toLocaleString()}</td>
        <td>{clicks.clicks_total}</td>
        <td>
          <Link to={`/report/${id}`} className='btn btn-dark btn-sm my-1'>
            Get Report
          </Link>
        </td>
      </tr>
    </Fragment>
  )
}

ReportListItem2.propTypes = {
  report: PropTypes.object.isRequired,
}

export default ReportListItem2
