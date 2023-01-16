import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Signin from '../Signin/Signin'
import SignUp from '../Signup/Signup'
import './Main.css'

export default function Main() {
    return (
        <div className='main'>
            <div className="App">
                <div className="auth-wrapper top-margin">
                    <div className="auth-inner">
                        <Routes>
                            <Route exact path="/" element={<Signin />} />
                            <Route path="/signin" element={<Signin />} />
                            <Route path="/signup" element={<SignUp />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    )
}