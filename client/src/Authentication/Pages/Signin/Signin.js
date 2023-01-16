import React, {useState} from 'react'
import { Link, Navigate } from 'react-router-dom'

import './Signin.css'
import { signin } from '../../../_Services/UserService'
import auth from '../../_AuthenticationHelper'

export default function Signin(props) {
  const [values, setValues] = useState({
    email: '',
    password: '',
    message: '',
    redirectToReferrer: false,
    msgColor: 'red'
  })

  const clickSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: values.email || undefined,
      password: values.password || undefined
    }

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, message: "Oh Snap! " + data.error, msgColor: "red" })
      } else {
        auth.authenticate(data, () => {
          setValues({ ...values, message: '', redirectToReferrer: true, msgColor: "green" })
        })
      }
    })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const { redirectToReferrer } = values
  if (redirectToReferrer) {
    console.log(redirectToReferrer)
    return (<Navigate to="/account" />)
  } 
  return (
    <form className="login">
      <h3>Sign In</h3>
      <div className="mb-3">
        <label>Email address</label>
        <input
          value={values.email} onChange={handleChange('email')}
          type="email"
          className="form-control"
          placeholder="Enter email"
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          value={values.password} onChange={handleChange('password')}
          type="password"
          className="form-control"
          placeholder="Enter password"
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary" onClick={clickSubmit}>
          Submit
        </button>
      </div>
      <br />
      <p className="forgot-password text-right">
        Are you new to expencss tracker &nbsp;
        <Link className="link-font" to={'/signup'}>Signup</Link>
      </p>
      {values.message && (<p style={{ color: values.msgColor }}>{values.message}</p>)}
    </form>
  )
}