import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useAuth, logout } from '../../context/auth/AuthState'

const Navbar = ({ title }) => {
  const [authState, authDispatch] = useAuth()
  const { isAuthenticated, user } = authState

  const onLogout = () => {
    logout(authDispatch)
  }

  const authLinks = (
    <Fragment>
      <li>
        <Link to='/updating'>Saved</Link>
      </li>
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
      {isAuthenticated ? (
        <Link to='/about'>{user && user.name} - MailChamp 2023</Link>
      ) : (
        <Link to='/about'>MailChamp 2023</Link>
      )}
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  )
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
}

Navbar.defaultProps = {
  title: 'MailChamp 2023',
  icon: 'fas fa-id-card-alt',
}

export default Navbar
