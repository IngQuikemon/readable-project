import React, {Component} from 'react';
import { Grid, Row, Col, PageHeader,Panel,Badge,Button,Jumbotron,Glyphicon,Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import CommentList from './CommentList';
import EditPostForm from './EditPostForm';
import {editPost,loadPostItem,votePost,deletePost} from '../actions';
import * as APIInterface from '../utils/APIInterface';

const upVoteValue = 'upVote';
const downVoteValue = 'downVote';
const editModalTitle = 'Edit post';

class PostView extends Component{
  state = {
    showModal:false,
    modalTitle:''
  }
  componentWillMount(){
    this.loadPost(this.props.match.params.id);
  }

  loadPost = filter =>{
    APIInterface.getPost(filter).then((post) => {
      APIInterface.getComments(filter).then((comments) => {
        this.props.loadPostItem({
          post:post,
          comments:comments
        });
      });
    });
  }

  vote = (postItem,voteValue,source) => {
    APIInterface.votePost(postItem.id, voteValue).then((postItem)=>{
      this.props.votePostItem(postItem);
    });
  }

  openEditModal = () => {
    this.setState({showModal:true});
  }
  closeEditModal = () => {
    this.setState({showModal:false});
  }

  openEditPostDialog = (post) => {
    this.setState({modalTitle:editModalTitle});
    this.setState({postItem : post});
    this.openEditModal();
  }

  deletePost = (post) => {
    APIInterface.deletePost(post.id).then((postReponse) =>{
      this.props.deletePostItem(postReponse);
      this.props.history.push('/');
    });
  }

  render(){
    const {post,onLoadComments,onVoteComment,onDeleteComment} = this.props;
    let dateToParse;
    let postDate;
    if(post.postItem !== null){
      dateToParse = new Date(post.postItem.timestamp);
      postDate = dateToParse.getMonth() + '/' + dateToParse.getDay() + '/' + dateToParse.getFullYear();
      return(
        <div>
          <Grid>
            <Row className="show-grid">
              <Col md={12}>
                <PageHeader> {post.postItem.title} </PageHeader>
                <div>
                  <span>posted by {post.postItem.author} on {postDate}. </span>
                  <span>
                    Score: <Badge>{post.postItem.voteScore}</Badge>
                    <Button
                      bsStyle="link"
                      onClick={() => this.vote(post.postItem,{option:upVoteValue},'item')}>
                      <Glyphicon glyph="thumbs-up"/>
                    </Button>
                    <Button
                      bsStyle="link"
                      onClick={() =>  this.vote(post.postItem,{option:downVoteValue},'item')}>
                      <Glyphicon glyph="thumbs-down"/>
                    </Button>
                  </span>
                  <span className="button_right">
                    <Link to="/">
                      <Glyphicon glyph="home"/> Return
                    </Link>
                    &nbsp;
                    &nbsp;
                    <Button bsStyle="default" onClick={() => {this.openEditPostDialog(post.postItem)}}>
                      <Glyphicon glyph="pencil"/> Edit
                    </Button>
                    <Button bsStyle="danger" onClick={() => {this.deletePost(post.postItem)}}>
                      <Glyphicon glyph="trash"/> Delete
                    </Button>
                  </span>
                </div>
                <br/>
                <Jumbotron>
                  {post.postItem.body}
                </Jumbotron>
              <br/>
              <CommentList
                postId={post.postItem.id}
                onGenerateId={this.props.onGenerateId}
                onSaveComment={this.props.onSaveComment}
                onVoteComment={onVoteComment}
                onLoadComments = {onLoadComments}
                onDeleteComment={onDeleteComment}
                comments={post.comments} />
              </Col>
            </Row>
          </Grid>
          <Modal show={this.state.showModal} onHide = {this.closeEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditPostForm
                postItem={this.props.post.postItem}
                onCloseEditModal = {this.closeEditModal} />
            </Modal.Body>
          </Modal>
        </div>
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

function mapStateToProps (state){
  return {
    post:state.post
  };
}

function mapDispatchToProps(dispatch){
  return {
    editPostItem: (data) => dispatch(editPost(data)),
    votePostItem: (data) => dispatch(votePost(data)),
    loadPostItem: (data) => dispatch(loadPostItem(data)),
    deletePostItem: (data) => dispatch(deletePost(data))
  };
}

let ReducedComponent= connect(mapStateToProps,mapDispatchToProps)(PostView);
export default withRouter(ReducedComponent)
