import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import Bisection from './Bisection'
import Secant from './Secant'
import App from './App'
import False from './False'
import Newton from './Newton'
import OP from './OP'

export default () => {
  return (
    <BrowserRouter>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/bisection' component={Bisection} />
        <Route path='/secant' component={Secant} />
        <Route path='/false' component={False} />
        <Route path='/newton' component={Newton} />
        <Route path='/op' component={OP} />
      </div>
    </BrowserRouter>
  )
}