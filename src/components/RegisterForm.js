import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Form } from 'semantic-ui-react'
import { hideRegisterForm } from '../reducers/viewReducer'
import { views } from '../constants'
import loginService from '../services/loginService'

class RegisterForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      passwordConf: '',
      displayname: '',
      email: '',
      usernameError: false,
      passwordError: false,
      displaynameError: false,
      emailError: false
    }
  }

  close = () => this.props.hideRegisterForm()

  register = async (event) => {
    event.preventDefault()

    this.setState({
      usernameError: false,
      passwordError: false,
      displaynameError: false,
      emailError: false
    })

    if (this.state.username.length < 6) {
      await this.setState({ usernameError: true })
    }
    if (this.state.password.length < 8 ||
        this.state.password !== this.state.passwordConf) {
      await this.setState({ passwordError: true })
    }
    if (this.state.displayname.length < 6) {
      await this.setState({ displaynameError: true })
    }
    if (this.state.email.length < 6) {
      await this.setState({ emailError: true })
    }

    if (this.state.usernameError ||
        this.state.passwordError ||
        this.state.displaynameError ||
        this.state.emailError) {

      return

    } else {
      const userObject = {
        username: this.state.username,
        password: this.state.password,
        displayname: this.state.displayname,
        email: this.state.email
      }

      try {
        await loginService.register(userObject)
        this.props.hideRegisterForm()

      } catch (error) {
        console.log('Virhe rekisteröinnissä...')
        console.log(error)
      }
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    console.log('open ' + this.props.open)
    return (
      <div>
        <Modal
          open={this.props.open}
          closeOnDimmerClick={false}
          onClose={this.close}
          closeIcon
        >
          <Modal.Header>Rekisteröidy käyttäjäksi</Modal.Header>
          <Modal.Content>
            <Form onSubmit={ this.register }>
              <div>
                Käyttäjätunnus:
                <Form.Input
                  type="text"
                  name="username"
                  error={ this.state.usernameError }
                  onChange={ this.handleChange }
                />
              </div>
              <div>
                Salasana:
                <Form.Input
                  type="password"
                  name="password"
                  error={ this.state.passwordError }
                  onChange={ this.handleChange }
                />
              </div>
              <div>
                Salasana uudelleen:
                <Form.Input
                  type="password"
                  name="passwordConf"
                  error={ this.state.passwordError }
                  onChange={ this.handleChange }
                />
              </div>
              <div>
                Nimimerkki:
                <Form.Input
                  type="text"
                  name="displayname"
                  error={ this.state.displaynameError }
                  onChange={ this.handleChange }
                />
              </div>
              <div>
                Sähköpostiosoite:
                <Form.Input
                  type="text"
                  name="email"
                  error={ this.state.emailError }
                  onChange={ this.handleChange }
                />
              </div>
              <Button type="submit">
                Rekisteröidy
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.view.showing === views.REGISTERFORM
  }
}

const mapDispatchToProps = {
  hideRegisterForm
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm)