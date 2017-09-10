import React, {Component} from 'react';
import {Panel,Badge,Button,Glyphicon} from 'react-bootstrap';

class CommentItem extends Component{

  editComment = (comment) => {
    this.props.onEditCommentDialog(comment);
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
          <span>Score: <Badge> {commentItem.voteScore}</Badge></span>
          <span className="button_right">
            <Button bsSize="xsmall"
              onClick={() => {this.editComment(commentItem,commentItem.parentId)}}>
              <Glyphicon glyph="pencil"/> Edit
            </Button>
            <Button bsStyle="danger" bsSize="xsmall">
              <Glyphicon glyph="trash"/> Delete
            </Button>
          </span>
      </div>
      </Panel>
    );
  }
}

export default CommentItem
