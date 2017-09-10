import React, {Component} from 'react';
import {Panel,Badge,Button,Glyphicon} from 'react-bootstrap';

const upVoteValue = 'upVote';
const downVoteValue = 'downVote';

class CommentItem extends Component{

  editComment = (comment) => {
    this.props.onEditCommentDialog(comment);
  }

  deleteComment = (commentItem) => {
    this.props.onDeleteComment(commentItem);
  }

  vote = (id,voteValue,parentId) => {
    this.props.onVoteComment(id,voteValue,parentId);
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
              onClick={() => this.vote(commentItem.id,{option:upVoteValue},commentItem.parentId)}>
              <Glyphicon glyph="thumbs-up"/>
            </Button>
            <Button
              bsStyle="link"
              onClick={() =>  this.vote(commentItem.id,{option:downVoteValue}, commentItem.parentId)}>
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

export default CommentItem
