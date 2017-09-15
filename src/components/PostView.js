import React, {Component} from 'react';
import { Grid, Row, Col, PageHeader,Panel,Badge,Button,Jumbotron,Glyphicon,Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import CommentList from './CommentList';
import EditPostForm from './EditPostForm';

const upVoteValue = 'upVote';
const downVoteValue = 'downVote';
const editModalTitle = 'Edit post';
const newModalTitle = 'New post';

class PostView extends Component{
  state = {
    showModal:false,
    modalTitle:'',
    postItem:null
  }
  componentWillMount(){
    this.loadPost(this.props.match.params.id);
  }

  loadPost = filter =>{
    this.setState({postItem : this.props.posts.find(x => x.id === filter)});
  }

  vote = (postItem,voteValue,source) => {
    this.props.onVotePost(postItem,voteValue,source);
  }

  openEditModal = () => {
    this.setState({showModal:true});
  }
  closeEditModal = () => {
    this.setState({showModal:false});
  }

  openEditPostDialog = (post) => {
    console.log(post);
    if(post === undefined || post === null){
      post = {
        id:'',
        title:'',
        timestamp:'',
        body: '',
        author:''
      };
      this.setState({modalTitle:newModalTitle});
    }
    else{
      this.setState({modalTitle:editModalTitle});
    }
    this.setState({postItem : post});
    this.openEditModal();
  }

  deletePost = (post) => {
    this.props.onDeletePost(post);
    this.props.history.push('/');
  }

  render(){
    const {postItem, comments, onLoadComments,onVoteComment,onDeleteComment,onSavePost} = this.props;
    let dateToParse;
    let postDate;
    if(postItem !== null){
      dateToParse = new Date(postItem.timestamp);
      postDate = dateToParse.getMonth() + '/' + dateToParse.getDay() + '/' + dateToParse.getFullYear();
      return(
        <div>
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
                    <Link to="/">
                      <Glyphicon glyph="home"/> Return
                    </Link>
                    &nbsp;
                    &nbsp;
                    <Button bsStyle="default" onClick={() => {this.openEditPostDialog(postItem)}}>
                      <Glyphicon glyph="pencil"/> Edit
                    </Button>
                    <Button bsStyle="danger" onClick={() => {this.deletePost(postItem)}}>
                      <Glyphicon glyph="trash"/> Delete
                    </Button>
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
          <Modal show={this.state.showModal} onHide = {this.closeEditModal}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <EditPostForm
                onGenerateId={this.props.onGenerateId}
                postItem={this.state.postItem}
                onSavePost={onSavePost}
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
  return {posts:state.posts};
}

let ReducedComponent= connect(mapStateToProps)(PostView);
export default withRouter(ReducedComponent)
