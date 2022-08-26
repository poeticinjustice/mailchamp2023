import React, { Fragment, useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

// For use when icon and user are active
// const Navbar = ({ title, icon }) => {
// const { isAuthenticated, logout, user } = authContext

const Navbar = ({ title }) => {
  const authContext = useContext(AuthContext)

  const { isAuthenticated, logout } = authContext

  const onLogout = () => {
    logout()
  }

  const authLinks = (
    <Fragment>
      {/* <li>Hello {user && user.name}</li> */}
      <li>
        <Link to='/updating'>Actual</Link>
      </li>
      <li>
        <Link to='/'>All</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  )

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/login'>Login</Link>
      </li>
      <li>
        <Link to='/about'>About</Link>
      </li>
    </Fragment>
  )

  return (
    <div className='navbar bg-primary'>
      {title}
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

Navbar.defaultProps = {
  title: 'MailChamp',
  icon: 'fas fa-id-card-alt',
}

export default Navbar
