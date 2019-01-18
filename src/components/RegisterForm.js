import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Form } from 'semantic-ui-react'
import { hideRegisterForm } from '../reducers/viewReducer'
import { views } from '../constants'
import loginService from '../services/loginService'

class RegisterForm extends Component {

  close = () => this.props.hideRegisterForm()

  register = async (event) => {
    event.preventDefault()

    if (event.target.username.value.length >= 6 &&
        event.target.password.value.length >= 8 &&
        event.target.screenname.value.length >= 6 &&
        event.target.email.value.length >= 6 &&
        event.target.password.value === event.target.passwordConf.value) {

      const userObject = {
        username: event.target.username.value,
        password: event.target.password.value,
        displayname: event.target.screenname.value,
        email: event.target.email.value
      }

      try {
      await loginService.register(userObject)
      this.props.hideRegisterForm()

      } catch (error) {
        console.log('Virhe rekisteröinnissä...')
        console.log(error)
      }
    } else {
      console.log('Tiedoissa jotain pielessä!')
    }
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
                />
              </div>
              <div>
                Salasana:
                <Form.Input
                  type="password"
                  name="password"
                />
              </div>
              <div>
                Salasana uudelleen:
                <Form.Input
                  type="password"
                  name="passwordConf"
                />
              </div>
              <div>
                Nimimerkki:
                <Form.Input
                  type="text"
                  name="screenname"
                />
              </div>
              <div>
                Sähköpostiosoite:
                <Form.Input
                  type="text"
                  name="email"
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