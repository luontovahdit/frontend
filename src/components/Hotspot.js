import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Modal, Icon, Label, Divider, Segment } from 'semantic-ui-react'
import { hideHotspot } from '../reducers/viewReducer'
import { views } from '../constants'
import Comments from './Comments'
import Togglable from './Togglable'
import CommentForm from './CommentForm'

class Hotspot extends Component {

  close = () => this.props.hideHotspot()

  render() {

    if (this.props.hotspot) {
      const hs = this.props.hotspot

      const showCommentButton = () => {
        if (this.props.isUserLoggedIn) {
          return (
            <Togglable buttonLabel="Kommentoi">
              <CommentForm hotspotId={ hs.id } />
            </Togglable>
          )
        } else {
          return null
        }
      }

      return (
        <div>
          <Modal
            open={ this.props.open }
            closeOnDimmerClick={ false }
            onClose={ this.close }
            closeIcon
          >
            <Modal.Header>{ hs.title }</Modal.Header>
            <Modal.Content>
              <Button as='div' labelPosition='right'>
                <Button basic color='green'>
                  <Icon name='thumbs up' />
                </Button>
                <Label as='a' basic pointing='left'>
                  { hs.upVotes }
                </Label>
              </Button>
              <Button as='div' labelPosition='right'>
                <Button basic color='orange'>
                  <Icon name='thumbs down' />
                </Button>
                <Label as='a' basic pointing='left'>
                  { hs.downVotes }
                </Label>
              </Button>
              <Button basic color='red'>
                  <Icon name='flag' />
              </Button>
              lisännyt { hs.addedBy.name }
              <Divider hidden />
              { hs.description }
              <Divider hidden />
              { showCommentButton() }
              <Comments comments={ hs.comments } />
            </Modal.Content>
          </Modal>
        </div>
      )
    } else {
      return (
        <div>
          <Modal
            open={this.props.open}
            closeOnDimmerClick={false}
            onClose={this.close}
            closeIcon
          >
            <Modal.Header>Kohdetta ei löytynyt!</Modal.Header>
            <Modal.Content>
              <p>Jotain meni pieleen.</p>
            </Modal.Content>
          </Modal>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    open: state.view.showing === views.HOTSPOT,
    hotspot: state.hotspot.currentHotspot,
    isUserLoggedIn: state.view.isUserLoggedIn
  }
}

const mapDispatchToProps = {
  hideHotspot
}

export default connect(mapStateToProps, mapDispatchToProps)(Hotspot)