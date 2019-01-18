import React from 'react'
import { Segment, Label, Button, Icon, Header, Divider } from 'semantic-ui-react'
import { dateFormat } from '../constants'

class Comments extends React.Component {

  render() {
    console.log(this.props)
    return (
      <div>
        { this.props.comments.map(comment =>
          <div key={ comment.id }>
            <Segment>
              { new Date(comment.createdAt).toLocaleDateString('fi-FI', dateFormat) } lisännyt { comment.addedBy.name }
              <Divider hidden />
              <p>{ comment.content }</p>
              <Divider hidden />
              <Button as='div' labelPosition='right'>
                <Button compact basic color='green'>
                  <Icon name='thumbs up' />
                </Button>
                <Label basic pointing='left'>
                  { comment.upVotes }
                </Label>
              </Button>
              <Button as='div' labelPosition='right'>
                <Button compact basic color='orange'>
                  <Icon name='thumbs down' />
                </Button>
                <Label as='a' basic pointing='left'>
                  { comment.downVotes }
                </Label>
              </Button>
              <Button compact basic color='red'>
                  <Icon name='flag' />
              </Button>
            </Segment>
            <Divider hidden />
          </div>
        ) }
      </div>
    )
  }
}

export default Comments