import React, { Fragment, useEffect, useContext } from 'react'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom'
import MailchimpContext from '../../context/mailchimp/mailchimpContext'

const Report2 = ({ match }) => {
  const mailchimpContext = useContext(MailchimpContext)
  const {
    getReport,
    getCampaign,
    getUrlsClicked,
    report,
    campaign,
    urlsClicked,
    loading,
  } = mailchimpContext

  useEffect(() => {
    getReport(match.params.id)
    getCampaign(match.params.id)
    getUrlsClicked(match.params.id)
    // eslint-disable-next-line
  }, [])

  const { subject_line, emails_sent, send_time, unsubscribed } = report
  const { archive_url, web_id } = campaign

  const tdStyle1 = {
    width: 760,
    height: 48,
    fontFamily: 'Trebuchet MS',
    color: '#1F497D',
    paddingLeft: 4,
  }

  const tdStyle2 = {
    width: 120,
    height: 36,
    fontFamily: 'Trebuchet MS',
    color: '#1F497D',
    paddingLeft: 8,
    verticalAlign: 'bottom',
  }

  const tdStyle3 = {
    width: 640,
    height: 48,
    borderTop: 'solid #DEDDDC 1.0pt',
    borderBottom: 'solid #DEDDDC 1.0pt',
    fontFamily: 'Trebuchet MS',
    background: '#F6F6F4',
    paddingLeft: 8,
    fontSize: '100%',
  }

  const tdStyle4 = {
    width: 120,
    height: 48,
    borderTop: 'solid #DEDDDC 1.0pt',
    borderBottom: 'solid #DEDDDC 1.0pt',
    fontFamily: 'Trebuchet MS',
    background: '#F6F6F4',
    paddingRight: 8,
    fontSize: '100%',
    textAlign: 'right',
  }

  const tdStyle5 = {
    width: 640,
    height: 36,
    overflow: 'hidden',
    borderBottom: 'dotted #DEDDDC 1.0pt',
    fontFamily: 'Trebuchet MS',
    paddingLeft: 8,
    fontSize: '100%',
    maxWidth: 640,
  }

  const tdStyle6 = {
    width: 120,
    height: 36,
    textAlign: 'right',
    borderBottom: 'dotted #DEDDDC 1.0pt',
    fontFamily: 'Trebuchet MS',
    paddingRight: 8,
    fontSize: '100%',
  }

  if (loading || !report.clicks || !urlsClicked.urls_clicked) return <Spinner />
  let lsa = 'http://www.lightingandsoundamerica.com/'
  let plasaMedia = 'http://www.plasa.org/media/'
  let unique_opens = report.opens.unique_opens
  let open_percent = ((unique_opens / emails_sent) * 100).toFixed(2)
  let reportLink = `https://us19.admin.mailchimp.com/reports/summary?id=${web_id}`
  let unsubscribedLink = `https://us19.admin.mailchimp.com/reports/activity/unsubscribed?id=${web_id}`

  let data = urlsClicked.urls_clicked,
    combined = (function (array) {
      let r = []
      array.forEach(function (a, i) {
        if (!this[a.url]) {
          this[a.url] = { url: a.url, total_clicks: a.total_clicks }
          if (a.url !== lsa && a.url !== plasaMedia) {
            r.push(this[a.url])
          }
        }

        // this[a.url].total_clicks += a.total_clicks
      }, {})

      return r
    })(data)

  const updated_clicks = data
    .filter(({ url }) => url !== plasaMedia && url !== lsa)
    .reduce(
      (total, currentValue) => (total = total + currentValue.total_clicks),
      0
    )

  combined.sort((a, b) => (a.total_clicks > b.total_clicks ? -1 : 1))

  let click_percent = ((updated_clicks / unique_opens) * 100).toFixed(2)

  let urls = combined.map((urlClicked) => (
    <tr key={urlClicked.url}>
      <td style={tdStyle5}>
        <a href={urlClicked} target='_blank' rel='noopener noreferrer'>
          {urlClicked.url}
        </a>
      </td>
      <td style={tdStyle6}>
        {urlClicked.total_clicks} (
        {((urlClicked.total_clicks / updated_clicks) * 100).toFixed(0)}%)
      </td>
      <td></td>
    </tr>
  ))

  const sendDate = new Date(send_time)
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  const formattedDate = new Intl.DateTimeFormat('en-US', dateOptions).format(
    sendDate
  )

  return (
    <Fragment>
      <Link to='/updating' className='btn btn-light'>
        Back to Report List 2 (updating)
      </Link>
      <br />
      <br />
      <table>
        <tbody>
          <tr>
            <td>{emails_sent.toLocaleString()}</td>
            <td>{unique_opens.toLocaleString()}</td>
            <td>{open_percent}%</td>
            <td>{updated_clicks.toLocaleString()}</td>
            <td>{click_percent}%</td>
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
      <table>
        <tbody>
          <tr>
            <td style={tdStyle1}>
              {subject_line}: Lighting&amp;Sound America Marketing Campaign;{' '}
              {formattedDate}
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td style={tdStyle2}>Total Sent:</td>
            <td style={tdStyle2}>{emails_sent.toLocaleString()}</td>
          </tr>
          <tr>
            <td style={tdStyle2}>Opened:</td>
            <td style={tdStyle2}>{unique_opens.toLocaleString()}</td>
            <td style={tdStyle2}>{open_percent}%</td>
          </tr>
          <tr>
            <td style={tdStyle2}>Total Clicks:</td>
            <td style={tdStyle2}>{updated_clicks.toLocaleString()}</td>
            <td style={tdStyle2}>{click_percent}%</td>
          </tr>
          <tr>
            <td style={tdStyle2}>Clickthroughs:</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <td style={tdStyle3}>URL</td>
            <th style={tdStyle4}>Total Clicks</th>
          </tr>
        </thead>
        <tbody>{urls}</tbody>
      </table>
    </Fragment>
  )
}

export default Report2
