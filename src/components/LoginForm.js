import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Modal, Form, Icon } from 'semantic-ui-react'
import { hideLoginForm, setUserLoggedIn, showRegisterForm } from '../reducers/viewReducer'
import { views } from '../constants'
import loginService from '../services/loginService'

class LoginForm extends Component {

  open = () => {
    this.props.history.push('/login')
  }

  close = () => {
    this.props.hideLoginForm()
    this.props.history.push('/')
  }

  login = async (event) => {
    event.preventDefault()

    if (event.target.username.value.length > 0 &&
        event.target.password.value.length > 0) {
      try {
        await loginService.login({
          username: event.target.username.value,
          password: event.target.password.value
        })
        this.props.setUserLoggedIn(true)
        this.props.hideLoginForm()
      } catch (error) {
        console.log(error)
      }
    }
  }

  render() {

    return (
      <div>
        <Modal
          open={this.props.open}
          closeOnDimmerClick={false}
          onOpen={this.open}
          onClose={this.close}
          closeIcon
        >
          <Modal.Header>Tervetuloa!</Modal.Header>
          <Modal.Content>
            <Form onSubmit={ this.login }>
              <div>
                Käyttäjätunnus:
                <Form.Input
                  type="text"
                  name="username"
                />
              </div>
              <div>
                Salasana:
                <Form.Input
                  type="password"
                  name="password"
                />
              </div>
              <Button type="submit" icon labelPosition='right'>
                Kirjaudu sisään
                <Icon name='sign in' />
              </Button>
              <Button type="button" onClick={ this.props.showRegisterForm }>
                Rekisteröidy?
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
    open: state.view.showing === views.LOGINFORM
  }
}

const mapDispatchToProps = {
  hideLoginForm,
  setUserLoggedIn,
  showRegisterForm
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm))