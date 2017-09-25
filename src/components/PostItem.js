import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ListGroupItem, Badge, Button,Glyphicon } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import * as APIInterface from '../utils/APIInterface';
import {votePost,loadCommentsCount,loadFilteredCommentsCount} from '../actions';

const upVoteValue = 'upVote';
const downVoteValue = 'downVote';

class PostItem extends Component {

  componentDidMount(){
    let postItem = this.props.postItem;
    APIInterface.getComments(postItem.id)
      .then((comments) =>{
        if(this.props.filterBy !== ''){
          this.props.filteredCommentsCount({
            post: postItem,
            count:comments.length
          });
        }else{
          this.props.commentsCount({
            post:postItem,
            count:comments.length
          });
        }
      });
  }
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
            <Link to={`/${postItem.category}/${postItem.id}`}>{postItem.title}</Link>
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
          <span className="blob_body">{postItem.body}</span><br/>
          <span className="blob_comment_count_text">
            Comments <Badge>{postItem.commentCount}</Badge>
          </span>
        </ListGroupItem>
    )
  }
}

function mapStateToProps (state){
  return {
    filterBy : state.posts.filterBy
  };
}

function mapDispatchToProps(dispatch){
  return {
    vote: (data) => dispatch(votePost(data)),
    commentsCount : (data) => dispatch(loadCommentsCount(data)),
    filteredCommentsCount: (data) => dispatch(loadFilteredCommentsCount(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(PostItem)
