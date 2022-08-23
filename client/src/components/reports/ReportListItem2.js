import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ReportListItem2 = ({
  report: { id, campaign_title, subject_line, send_time, emails_sent },
}) => {
  const sendDate2 = new Date(send_time).toLocaleDateString()

  // const sendDate = new Date(send_time).toDateString()
  // const sendTime = new Date(send_time).toLocaleTimeString('EDT')

  if (emails_sent > 11) {
    return (
      <Fragment>
        <tr>
          <td>{campaign_title}</td>
          <td>{subject_line}</td>
          <td>
            {sendDate2}
            {/* {sendDate} at {sendTime} */}
          </td>
          <td>{emails_sent.toLocaleString()}</td>
          <td>
            <Link to={`/report2/${id}`} className='btn btn-dark btn-sm my-1'>
              Get
            </Link>
          </td>
        </tr>
      </Fragment>
    )
  } else {
    return null
  }
}

ReportListItem2.propTypes = {
  report: PropTypes.object.isRequired,
}

export default ReportListItem2
