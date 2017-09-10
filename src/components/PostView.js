import React, {Component} from 'react';
import { Grid, Row, Col, PageHeader,Panel,Badge,Button,Jumbotron,Glyphicon} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import CommentList from './CommentList';

const upVoteValue = 'upVote';
const downVoteValue = 'downVote';

class PostView extends Component{
  componentDidMount(){
    this.loadPost(this.props.match.params.id);
  }

  loadPost = filter =>{
    this.props.onLoadPostItem(filter);
  }

  vote = (postItem,voteValue,source) => {
    this.props.onVotePost(postItem,voteValue,source);
  }

  render(){
    const {postItem, comments, onLoadComments,onVoteComment,onDeleteComment} = this.props;
    let dateToParse;
    let postDate;
    if(postItem !== null){
      dateToParse = new Date(postItem.timestamp);
      postDate = dateToParse.getMonth() + '/' + dateToParse.getDay() + '/' + dateToParse.getFullYear();
      return(
        <Grid>
          <Row className="show-grid">
            <Col md={12}>
              <PageHeader> {postItem.title} </PageHeader>
              <div>
                <span>posted by {postItem.author} on {postDate}. </span>
                <span>
                  Score: <Badge>{postItem.voteScore}</Badge>
                  <Button
                    bsStyle="link"
                    onClick={() => this.vote(postItem,{option:upVoteValue},'item')}>
                    <Glyphicon glyph="thumbs-up"/>
                  </Button>
                  <Button
                    bsStyle="link"
                    onClick={() =>  this.vote(postItem,{option:downVoteValue},'item')}>
                    <Glyphicon glyph="thumbs-down"/>
                  </Button>
                </span>
                <span className="button_right">
                  <Button bsStyle="link">
                    <Glyphicon glyph="pencil"/> Edit
                  </Button>
                  <Link to="/">
                    <Glyphicon glyph="home"/> Return
                  </Link>
                </span>
              </div>
              <br/>
              <Jumbotron>
                {postItem.body}
              </Jumbotron>
            <br/>
            <CommentList
              postId={postItem.id}
              onGenerateId={this.props.onGenerateId}
              onSaveComment={this.props.onSaveComment}
              onVoteComment={onVoteComment}
              onLoadComments = {onLoadComments}
              onDeleteComment={onDeleteComment}
              comments={comments} />
            </Col>
          </Row>
        </Grid>
      );
    }else{
      return (
        <Panel>
          The post was not found. Verify that you are selecting the right post.
        </Panel>
      );
    }
  }
}

export default PostView;
