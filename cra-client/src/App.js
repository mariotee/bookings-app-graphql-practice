import React from 'react'
import './App.css'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'

import AuthPage from 'views/auth'
import EventsPage from 'views/events'
import BookingsPage from 'views/bookings'
import Nav from 'components/Navigation'

import AuthContext from 'utils/context/auth'

import {USER_DATA_KEY} from 'utils/constants'

function App() {
  const [myState, setMyState] = React.useState({
    token: null,
    userId: null,
    initialised: false,
  })

  React.useEffect(() => {
    if (!myState.initialised) {
      let parsed = JSON.parse(localStorage.getItem(USER_DATA_KEY))
      
      if (parsed && ((Date.now() - parsed.created) < 1000*60*60*parsed.expiresHrs)) {
        loginFunc({
          token: parsed.token,
          userId: parsed.userId,
          expiresHrs: parsed.expiresHrs
        })
      } else {
        setMyState({          
          initialised: true,
        })
      }
    }
  }, [myState.initialised])

  const loginFunc = (data) => {
    const {token, userId, expiresHrs} = data
    localStorage.setItem(USER_DATA_KEY, JSON.stringify({
      created: Date.now(),
      token,
      userId,
      expiresHrs,      
    }))

    setMyState({
      token,
      userId,
      initialised: true,
    })
  }

  const logoutFunc = () => {
    localStorage.removeItem(USER_DATA_KEY)
    setMyState({
      token: null,
      userId: null,
    })
  }

  return <BrowserRouter>
  {
    myState.initialised && <AuthContext.Provider value={{
      token: myState.token,
      userId: myState.userId,
      login: loginFunc,
      logout: logoutFunc,
    }}>
      <nav>
        <Nav/>
      </nav>
      <main>
        <Switch>
          {!myState.token && <Route path="/auth" component={AuthPage}/>}
          {myState.token && <Redirect from="/" to="/events" exact/>}
          {myState.token && <Redirect from="/auth" to="/events"/>}          
          {myState.token && <Route path="/bookings" component={BookingsPage}/>}
          <Route path="/events" component={EventsPage}/>
          {!myState.token && <Redirect to="/auth"/>}
        </Switch>
      </main>
    </AuthContext.Provider>
  }
  </BrowserRouter>
}

export default App