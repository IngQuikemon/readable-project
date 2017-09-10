import React, {Component} from 'react'
import {ListGroupItem, Badge, Button,Glyphicon } from 'react-bootstrap';
import {Link} from 'react-router-dom';

const upVoteValue = 'upVote';
const downVoteValue = 'downVote';

class PostItem extends Component {

  vote = (postItem,voteValue,source) => {
    this.props.onVotePost(postItem,voteValue,source);
  }

  render(){
    const {postItem} = this.props;
    let dateToParse = new Date(postItem.timestamp);
    const postDate = dateToParse.getMonth() + '/' + dateToParse.getDay() + '/' + dateToParse.getFullYear();
    return(
        <ListGroupItem >
          <span className="blob_title_text">
            <Link to={`/posts/${postItem.id}`}>{postItem.title}</Link>
          </span>
          <span className="blob_score_text">
            Score <Badge>{postItem.voteScore}</Badge>
            <Button
              bsStyle="link"
              onClick={() => this.vote(postItem,{option:upVoteValue},'')}>
              <Glyphicon glyph="thumbs-up"/>
            </Button>
            <Button
              bsStyle="link"
              onClick={() =>  this.vote(postItem,{option:downVoteValue},'')}>
              <Glyphicon glyph="thumbs-down"/>
            </Button>
          </span><br/>
          <span className="blob_title_subtext">posted by {postItem.author} on {postDate}</span><br/>
          <span className="blob_body">{postItem.body}</span>
        </ListGroupItem>
    )
  }
}

export default PostItem
