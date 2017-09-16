import React, {Component} from 'react';
import {Panel, Button, Glyphicon, Modal} from 'react-bootstrap';
import CommentItem from './CommentItem';
import EditCommentForm from './EditCommentForm';

const editModalTitle = 'Edit comment';
const newModalTitle = 'New comment';
class CommentList extends Component{
  state ={
    showModal : false,
    commentItem : null,
    modalTitle : ''
  }
  /*
  * @description Opens the modal dialog.
  */
  openEditModal = () => {
    this.setState({showModal : true});
  }
  /*
  * @description Closes the modal dialog.
  */
  closeEditModal = () => {
    this.setState({showModal : false});
  }
  /*
* @description Initialize the edit dialog.
* @param {object} comment - the object containing the comment data to be edited
* or null in case of a new comment.
* @param {string} parentId - the parent id of the post the comment belongs to.
*/
  openEditCommentDialog = (comment,parentId) => {
    if(comment === undefined || comment === null){
      comment = {
        id:'',
        parentId:parentId,
        timestamp:'',
        body: '',
        author:''
      };
      this.setState({modalTitle:newModalTitle});
    }
    else{
      this.setState({modalTitle:editModalTitle});
    }
    this.setState({commentItem : comment});
    this.openEditModal();
  }


  render(){
    const {comments,postId} = this.props;
    console.log(comments);
    return (
      <div>
        <div className="full_width">
          <span className="title_text">Comments:</span>
          <span className="button_right">
            <Button bsStyle="link" onClick={() => {this.openEditCommentDialog(null,postId)}}>
              <Glyphicon glyph="plus"/> Add Comment
            </Button>
          </span>
        </div>
        <br/>
        {comments === undefined || comments.length === 0
          ? <div>
              <Panel>
                No comments found yet. Come on and start commenting.
              </Panel>
            </div>
          : <div>
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  commentItem={comment}
                  onEditCommentDialog={this.openEditCommentDialog}/>
              ))}
            </div>
        }
        <Modal show={this.state.showModal} onHide = {this.closeEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditCommentForm
              commentItem={this.state.commentItem}
              onCloseEditModal = {this.closeEditModal}/>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default CommentList;
