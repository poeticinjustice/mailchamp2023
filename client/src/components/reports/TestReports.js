import React, { Fragment, useEffect, useContext } from 'react';
import TestReportListItem from './TestReportListItem';
import Spinner from '../layout/Spinner';
import MailchimpContext from '../../context/mailchimp/mailchimpContext';

const TestReports = () => {
  const mailchimpContext = useContext(MailchimpContext);

  const { loading, reports, getReports } = mailchimpContext;

  useEffect(() => {
    getReports();
    // eslint-disable-next-line
  }, []);

  if (loading || !reports.reports) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <table>
          <caption></caption>
          <thead>
            <tr>
              <th>ID</th>
              <th>Campaign Title</th>
              <th>Campaign Subject</th>
              <th>Get Report</th>
            </tr>
          </thead>
          <tbody>
            {reports.reports.map(report => (
              <TestReportListItem key={report.id} report={report} />
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
};

export default TestReports;
