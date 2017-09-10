import React, {Component} from 'react';
import {Panel, Button, Glyphicon, Modal} from 'react-bootstrap';
import CommentItem from './CommentItem';
import EditCommentForm from './EditCommentForm';

class CommentList extends Component{
  state ={
    showModal : false
  }

  openEditModal = () => {
    this.setState({showModal : true});
  }

  closeEditModal = () => {
    this.setState({showModal : false});
  }

  render(){
    const {comments} = this.props;
    return (
      <div>
        {comments === undefined || comments.length === 0
          ? <div>
              <h2>Comments:</h2>
              <Panel>
                No comments found yet. Come on and start commenting.
              </Panel>
            </div>
          : <div>
              <div className="full_width">
                <span className="title_text">Comments:</span>
                <span className="button_right">
                  <Button bsStyle="link" onClick={this.openEditModal}>
                    <Glyphicon glyph="plus"/> Add Comment
                  </Button>
                </span>
              </div>
              <br/>
              {comments.map((comment) => (
                <CommentItem key={comment.id} commentItem={comment} />
              ))}
            </div>
        }
        <Modal show={this.state.showModal} onHide = {this.closeEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>New comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditCommentForm />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default CommentList
