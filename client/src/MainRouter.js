import React from 'react'
import {Route, Routes} from 'react-router-dom'

import PrivateRoute from "./Authentication/PrivateRoute"
import Main from './Authentication/Pages/Main/Main'
import Layout from './Layout/Layout'


const MainRouter = () => {
    return (<div>
      <Routes>
        <Route exact path="*" element={<Main/>}/>
        <Route path="/" element={<Main/>}/>
        <Route exact path="/account" element={<PrivateRoute/>}>
            <Route path='/account' element={<Layout/>}/>
        </Route>
    </Routes>
    </div>)
}

export default MainRouter