import React, {useState} from 'react'
import { Link } from 'react-router-dom'

import { sigupUser } from '../../../_Services/UserService'

export default function Signup() {
  const [values, setValues] = useState({
    name: '',
    password: '',
    email: '',
    open: false,
    message: '',
    msgColor: "red"
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const clickSubmit = (e) => {
    e.preventDefault();

    const user = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined
    }
    sigupUser(user).then((data) => {
      if (data.error) {
        setValues({ ...values, message: "Oh Snap! " + data.error, msgColor: "red"})
      } else {
        values.name = ""
        values.email = ""
        values.password = ""

        setValues({ ...values, message: 'Signup sucessfully, Please login!', open: true, msgColor: "green"})
      }
    })
  }

  return (
    <form>
      <h3>Sign Up</h3>
      <div className="mb-3">
        <label>Name</label>
        <input type="text" className="form-control" placeholder="Name" value={values.name} onChange={handleChange('name')} />
      </div>
      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={values.email} onChange={handleChange('email')}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={values.password} onChange={handleChange('password')}
        />
      </div>
      <div className="d-grid">
        <button type="submit" onClick={clickSubmit} className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <br/>
      <p className="forgot-password text-right">
          Already registerd &nbsp;
          <Link className="link-font" to={'/signin'}>Signin</Link>
        </p>
        {values.message && (<p style={{ color: values.msgColor }}>{values.message}</p>)}
    </form>
  )
}