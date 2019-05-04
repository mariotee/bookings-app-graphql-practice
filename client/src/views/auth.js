import React from 'react'
import AuthContext from "utils/context/auth"

import AuthForm from "components/Auth/Form"
import {apiQuery} from 'api/gqlRequest'
import * as AuthGql from 'api/graphqlQueries/auth'

class AuthPage extends React.Component
{  
  constructor(props) {
    super(props)
    this.emailRef = React.createRef()
    this.passwordRef = React.createRef()
    this.state = {
      isLogin: true,
    }
  }

  static contextType = AuthContext

  submitHandler = async (event) => {
    event.preventDefault()
    const email = this.emailRef.current.value
    const password = this.passwordRef.current.value
    
    if (email.trim().length === 0 || password.trim().length === 0) {
      return
    }

    if (!this.state.isLogin) {
      this.createUser(email,password)
    } else {
      this.loginUser(email,password)
    }
  }

  createUser = async (email,password) => {
    let response = await apiQuery(AuthGql.createUserMutation({email,password}))    
    .catch((err) => {
      console.log(err)
      alert("request failed")
    })

    let jsond = response.data

    if (jsond.errors) {
      console.log(jsond.errors)
      alert("request failed")
    }
    
    if (jsond.data && jsond.data.createUser) {      
      alert('create success')
      this.setState({
        isLogin: true,
      })
    }
  }

  loginUser = async (email,password) => {
    let response = await apiQuery(AuthGql.loginQuery({email,password}))
    .catch((err) => {
      console.log(err)
      alert("request failed")
    })

    let jsond = response.data

    if (jsond.errors) {      
      alert("request failed")
    }

    if (jsond.data && jsond.data.login) {
      this.context.login(jsond.data.login)
    }
  }

  switchAuthState = () => {
    this.setState((prevState) => {
      return {
        isLogin: !prevState.isLogin
      }
    })
  }

  render() {
    return <AuthForm
        isLogin={this.state.isLogin}
        submitHandler={this.submitHandler}
        switchAuthState={this.switchAuthState}
        emailRef={this.emailRef}
        passwordRef={this.passwordRef}
      />    
  }
}

export default AuthPage