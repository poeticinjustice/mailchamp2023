import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const TestReportListItem = ({
  report: { id, campaign_title, subject_line }
}) => {
  return (
    <Fragment>
      <tr>
        <td>{id}</td>
        <td>{campaign_title}</td>
        <td>{subject_line}</td>
        <td>
          <Link to={`/testing/${id}`} className='btn btn-dark btn-sm my-1'>
            Get Test Report
          </Link>
        </td>
      </tr>
    </Fragment>
  );
};

TestReportListItem.propTypes = {
  report: PropTypes.object.isRequired
};

export default TestReportListItem;
