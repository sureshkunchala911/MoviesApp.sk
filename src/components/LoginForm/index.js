import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    isPasswordChecked: false,
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
    const {username, password} = this.state
    localStorage.setItem('username', username)
    localStorage.setItem('password', password)
  }

  onSubmitFailure = errMsg => {
    this.setState({showSubmitError: true, errorMsg: errMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          onChange={this.onChangeUsername}
          value={username}
          className="input-field"
          type="text"
          id="username"
          placeholder="Username"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password, isPasswordChecked} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          onChange={this.onChangePassword}
          value={password}
          className="input-field"
          type={isPasswordChecked ? 'text' : 'password'}
          id="password"
          placeholder="Password"
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <img
          className="login-website-logo"
          src="https://res.cloudinary.com/dxwppeplp/image/upload/v1664025947/Group_7399_d0or4f.png"
          alt="login website logo"
        />
        <form className="form-container" onSubmit={this.submitForm}>
          <h1 className="login-text">Login</h1>
          <div className="input-container">{this.renderUsername()}</div>
          <div className="input-container">{this.renderPassword()}</div>
          {showSubmitError && <p className="login-err-msg">{errorMsg}</p>}
          <button className="login-btn" type="submit">
            Login
          </button>
          <button className="login-btn2" type="submit">
            Sign in
          </button>
        </form>
      </div>
    )
  }
}
export default LoginForm
