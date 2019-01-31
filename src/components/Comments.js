import React from 'react'
import { connect } from 'react-redux'
import { Segment, Label, Button, Icon, Header, Divider } from 'semantic-ui-react'
import { dateFormat } from '../constants'
import { upVoteComment, downVoteComment } from '../reducers/hotspotReducer'

class Comments extends React.Component {

  render() {
    console.log(this.props)
    return (
      <div>
        { this.props.comments.map(comment =>
          <div key={ comment.id }>
            <Segment>
              { new Date(comment.createdAt).toLocaleDateString('fi-FI', dateFormat) } lisännyt { comment.addedBy.displayname }
              <Divider hidden />
              <p>{ comment.content }</p>
              <Divider hidden />
              <Button as='div' labelPosition='right'>
                <Button
                  compact
                  basic
                  color='green'
                  type='button'
                  onClick={ () => this.props.upVoteComment(comment.id) }
                >
                  <Icon name='thumbs up' />
                </Button>
                <Label basic pointing='left'>
                  { comment.upVotes }
                </Label>
              </Button>
              <Button as='div' labelPosition='right'>
                <Button
                  compact
                  basic
                  color='orange'
                  type='button'
                  onClick={ () => this.props.downVoteComment(comment.id) }
                >
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

const mapStateToProps = (state) => {
  return {
    hs: state.hotspot.currentHotspot
  }
}

const mapDispatchToProps = {
  upVoteComment,
  downVoteComment
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)