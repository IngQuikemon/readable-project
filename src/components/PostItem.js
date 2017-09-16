import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ListGroupItem, Badge, Button,Glyphicon } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import * as APIInterface from '../utils/APIInterface';
import {votePost} from '../actions';

const upVoteValue = 'upVote';
const downVoteValue = 'downVote';

class PostItem extends Component {
  /*
  * @description triggers the modification of the score of the post.
  * @param {object} postItem - the post object which score needs to be changed.
  * @param {string} voteValue - indicates if increases or decreases the post score.
  */
  onVotePost = (postItem,voteValue) => {
    APIInterface.votePost(postItem.id,voteValue).then((post) =>{
      this.props.vote(post);
    });
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
              onClick={() => this.onVotePost(postItem,{option:upVoteValue})}>
              <Glyphicon glyph="thumbs-up"/>
            </Button>
            <Button
              bsStyle="link"
              onClick={() =>  this.onVotePost(postItem,{option:downVoteValue})}>
              <Glyphicon glyph="thumbs-down"/>
            </Button>
          </span><br/>
          <span className="blob_title_subtext">posted by {postItem.author} on {postDate}</span><br/>
          <span className="blob_body">{postItem.body}</span>
        </ListGroupItem>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    vote: (data) => dispatch(votePost(data))
  }
}

export default connect(null,mapDispatchToProps)(PostItem)
