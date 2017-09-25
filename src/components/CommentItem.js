import React, {Component} from 'react';
import {Panel,Badge,Button,Glyphicon} from 'react-bootstrap';
import {connect} from 'react-redux';
import {voteComment,deleteComment} from '../actions';
import * as APIInterface from '../utils/APIInterface';

const upVoteValue = 'upVote';
const downVoteValue = 'downVote';

class CommentItem extends Component{
  /*
  * @description Refresh the current shelf.
  * @param {object} comment - contains the comment to be deleted.
  */
  deleteComment = (comment) => {
    APIInterface.deleteComment(comment.id).then((commentItem) =>{
      this.props.delete(commentItem);
    });
  }
  /*
  * @description Refresh the current shelf.
  * @param {string} id - ID value of the item to be modified.
  * @param {string} voteValue - The voting value to alter the score.
  */
  voteComment = (id,voteValue) => {
    APIInterface.voteComment(id,voteValue).then((comment) =>{
      this.props.vote(comment);
    });
  }

  editComment= (comment,parentId) => {
    this.props.onEditCommentDialog(comment,parentId);
  }


  render(){
    const {commentItem} = this.props;
    let dateToParse = new Date(commentItem.timestamp);
    const postDate = dateToParse.getMonth() + '/' + dateToParse.getDay() + '/' + dateToParse.getFullYear();
    return(
      <Panel header={`${commentItem.author} on ${postDate}`}>
        {commentItem.body}
        <br/>
        <div className="full_width">
          <span>
            Score: <Badge> {commentItem.voteScore}</Badge>
            <Button
              bsStyle="link"
              onClick={() => this.voteComment(commentItem.id,{option:upVoteValue})}>
              <Glyphicon glyph="thumbs-up"/>
            </Button>
            <Button
              bsStyle="link"
              onClick={() =>  this.voteComment(commentItem.id,{option:downVoteValue})}>
              <Glyphicon glyph="thumbs-down"/>
            </Button>
          </span>
          <span className="button_right">
            <Button
              bsSize="xsmall"
              onClick={() => {this.editComment(commentItem,commentItem.parentId)}}>
              <Glyphicon glyph="pencil"/> Edit
            </Button>
            <Button
              bsStyle="danger"
              bsSize="xsmall"
              onClick={()=>{this.deleteComment(commentItem)}}>
              <Glyphicon glyph="trash"/> Delete
            </Button>
          </span>
      </div>
      </Panel>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    vote: (data) => dispatch(voteComment(data)),
    delete: (data) => dispatch(deleteComment(data))
  }
}

export default connect(null,mapDispatchToProps)(CommentItem)
