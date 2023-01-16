import React from 'react'
import { Navigate } from 'react-router-dom'

import auth from "../Authentication/_AuthenticationHelper"
import Dashboard from "./Pages/Dashboard/Dashboard"

export default function Layout() {
    return (
        <div className='layout'>
            <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                <div className="container">
                    <span className="navbar-brand">
                        Expenses Tracker
                    </span>
                    <div className="side-menu">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <button className="logout-btn" onClick={() => {
                                    auth.clearJWT(() => (<Navigate to="/signin" />))
                                    window.location.reload()
                                }}>Sign out</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <br/><br/>
            <br/>
            <div className="row layoutpage">
                <div className="col">
                    <Dashboard/>
                </div>
            </div>

        </div>
    )
}