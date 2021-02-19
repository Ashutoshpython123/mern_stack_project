import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Login from './Login'
import Register from './Register'
import Dashboard from './Dashboard'


function Pages() {
    return (
        <Switch>
            <Route path="/" exact component={Register}/>
            <Route path="/Dashboard" exact component={Dashboard} />
            <Route path="/Login" exact component={Login}/>
        </Switch>
    )
}

export default Pages
