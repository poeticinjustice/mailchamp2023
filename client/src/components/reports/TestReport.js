import React, { Fragment, useEffect, useContext } from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import MailchimpContext from '../../context/mailchimp/mailchimpContext';

const TestReport = ({ match }) => {
  const mailchimpContext = useContext(MailchimpContext);
  const {
    getReport,
    getCampaign,
    getUrlsClicked,
    report,
    campaign,
    urlsClicked,
    loading
  } = mailchimpContext;

  useEffect(() => {
    getReport(match.params.id);
    getCampaign(match.params.id);
    getUrlsClicked(match.params.id);
    // eslint-disable-next-line
  }, []);

  const { subject_line, emails_sent, send_time, unsubscribed } = report;
  const { archive_url, web_id } = campaign;

  if (loading || (!report.clicks || !urlsClicked.urls_clicked))
    return <Spinner />;

  let clicks_total = report.clicks.clicks_total;
  let click_percent = ((clicks_total / emails_sent) * 100).toFixed(2);
  let unique_opens = report.opens.unique_opens;
  let open_percent = ((unique_opens / emails_sent) * 100).toFixed(2);
  let reportLink = `https://us19.admin.mailchimp.com/reports/summary?id=${web_id}`;
  let unsubscribedLink = `https://us19.admin.mailchimp.com/reports/activity/unsubscribed?id=${web_id}`;

  var data = urlsClicked.urls_clicked,
    combined = (function(array) {
      var r = [];
      array.forEach(function(a, i) {
        if (!this[a.url]) {
          this[a.url] = { url: a.url, total_clicks: 0 };
          r.push(this[a.url]);
        }
        this[a.url].total_clicks += a.total_clicks;
      }, {});
      return r;
    })(data);

  combined.sort((a, b) => (a.total_clicks > b.total_clicks ? -1 : 1));

  let urls = combined.map(urlClicked => (
    <tr key={urlClicked.url}>
      <td>
        <a href={urlClicked.url} target='_blank' rel='noopener noreferrer'>
          {urlClicked.url}
        </a>
      </td>
      <td>{urlClicked.total_clicks}</td>
    </tr>
  ));

  const sendDate = new Date(send_time).toDateString();

  return (
    <Fragment>
      <Link to='/test' className='btn btn-light'>
        Back to Report Test List
      </Link>
      <br />
      <br />
      <table>
        <tbody>
          <tr>
            <td>{emails_sent}</td>
            <td>{clicks_total}</td>
            <td>{click_percent}%</td>
            <td>{unique_opens}</td>
            <td>{open_percent}%</td>
          </tr>
        </tbody>
      </table>
      <div>
        <a href={reportLink} target='_blank' rel='noopener noreferrer'>
          MailChimp Report
        </a>
      </div>
      <div>
        <a href={unsubscribedLink} target='_blank' rel='noopener noreferrer'>
          Unsubscribed: {unsubscribed}
        </a>
      </div>
      <div>
        <a href={archive_url} target='_blank' rel='noopener noreferrer'>
          Link to campaign
        </a>
      </div>
      <br />
      <br />
      <div>
        Ramzi's metrics report: {subject_line} | {sendDate}
      </div>
      <table>
        <tbody>
          <tr>
            <td>Sent:</td>
            <td>{emails_sent}</td>
          </tr>
          <tr>
            <td>Clicks:</td>
            <td>{clicks_total}</td>
            <td>{click_percent}%</td>
          </tr>
          <tr>
            <td>Opens:</td>
            <td>{unique_opens}</td>
            <td>{open_percent}%</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Total Clicks</th>
          </tr>
        </thead>
        <tbody>{urls}</tbody>
      </table>
    </Fragment>
  );
};

export default TestReport;
