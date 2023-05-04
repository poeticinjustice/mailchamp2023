import React, { Fragment } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
import Home from './components/pages/Home'
import Updating from './components/pages/Updating'
import Report from './components/reports/Report'
import Report2 from './components/reports/Report2'

import Register from './components/auth/Register'
import Login from './components/auth/Login'
import About from './components/pages/About'
import PrivateRoute from './components/routing/PrivateRoute'
import AuthState from './context/auth/AuthState'

import Test from './components/pages/Test'
import TestReport from './components/reports/TestReport'

import FullTest from './components/pages/FullTest'
import Saved from './components/reports/Saved'

import NotFound from './components/pages/NotFound'
import MailchimpState from './context/mailchimp/MailchimpState'
import AlertState from './context/alert/AlertState'
import './App.css'

const App = () => {
  return (
    <AuthState>
      <MailchimpState>
        <AlertState>
          <BrowserRouter>
            <Fragment>
              <div className='App'>
                <Navbar />
                <div className='container'>
                  <Alert />
                  <Routes>
                    <Route
                      path='/'
                      element={<PrivateRoute component={Home} />}
                    />
                    <Route
                      path='/updating'
                      element={<PrivateRoute component={Updating} />}
                    />
                    <Route
                      path='/report/:id'
                      element={<PrivateRoute component={Report} />}
                    />
                    <Route
                      path='/report2/:id'
                      element={<PrivateRoute component={Report2} />}
                    />
                    <Route path='about' element={<About />} />
                    <Route path='/test' element={<Test />} />
                    <Route path='/testing/:id' element={<TestReport />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/fulltest' element={<FullTest />} />
                    <Route path='/saved' element={<Saved />} />
                    <Route element={NotFound} />
                  </Routes>
                </div>
              </div>
            </Fragment>
          </BrowserRouter>
        </AlertState>
      </MailchimpState>
    </AuthState>
  )
}

export default App
