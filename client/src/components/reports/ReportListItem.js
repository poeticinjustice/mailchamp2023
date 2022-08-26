import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ReportListItem = ({
  report: { id, campaign_title, subject_line, send_time, emails_sent },
}) => {
  const sendDate = new Date(send_time).toLocaleDateString()

  return (
    <Fragment>
      <tr>
        <td>{campaign_title}</td>
        <td>{subject_line}</td>
        <td>{sendDate}</td>
        <td>{emails_sent.toLocaleString()}</td>
        <td>
          <Link to={`/report2/${id}`} className='btn btn-dark btn-sm my-1'>
            Get
          </Link>
        </td>
        <td>
          <Link to={`/report/${id}`} className='btn btn-dark btn-sm my-1'>
            Get
          </Link>
        </td>
      </tr>
    </Fragment>
  )
}

ReportListItem.propTypes = {
  report: PropTypes.object.isRequired,
}

export default ReportListItem
