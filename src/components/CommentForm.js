import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, TextArea } from 'semantic-ui-react'
import { addComment } from '../reducers/hotspotReducer'

class CommentForm extends Component {

  addComment = async (event) => {
    event.preventDefault()

    if (event.target.comment.value.length > 0) {

      const commentObject = {
        content: event.target.comment.value,
        inHotspot: this.props.hotspotId
      }

      event.target.comment.value = ''

      await this.props.addComment(commentObject)

      if (this.props.error) {
        console.log('Error adding comment...')
        console.log(this.props.error)
      } else {
        console.log('Added hotspot!')
      }
    }
  }

  render() {
    return (
      <Form onSubmit={ this.addComment }>
      <div>
        <TextArea
          name="comment"
          style={{ minHeight: 100 }} />
      </div>
      <Button type="submit">
        Lisää
      </Button>
    </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.hotspot.error
  }
}

const mapDispatchToProps = {
  addComment
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)