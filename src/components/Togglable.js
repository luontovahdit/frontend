import React from 'react'
import { Segment, Button, Divider } from 'semantic-ui-react'

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <Segment>
        <div style={hideWhenVisible}>
          <Button onClick={this.toggleVisibility}>{this.props.buttonLabel}</Button>
        </div>
        <div style={showWhenVisible}>
          <Button basic onClick={this.toggleVisibility}>Peruuta</Button>
          <Divider hidden />
          {this.props.children}
        </div>
      </Segment>
    )
  }
}

export default Togglable