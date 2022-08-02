import React, { Fragment, useContext, useEffect } from 'react'
import Reports2 from '../reports/Reports2'
import AuthContext from '../../context/auth/authContext'

const Updating = () => {
  const authContext = useContext(AuthContext)

  useEffect(() => {
    authContext.loadUser()
    // eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      <Reports2 />
    </Fragment>
  )
}

export default Updating
