import React, {Component} from 'react';
import { Grid, Row, Col, PageHeader,Badge,Button,Jumbotron,Glyphicon,Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import CommentList from './CommentList';
import EditPostForm from './EditPostForm';
import {editPost,loadPostItem,votePost,deletePost,postFilter} from '../actions';
import * as APIInterface from '../utils/APIInterface';
import NotFound from './NotFound';

const upVoteValue = 'upVote';
const downVoteValue = 'downVote';
const editModalTitle = 'Edit post';

class PostView extends Component{
  state = {
    showModal:false,
    modalTitle:''
  }
  /*
  * @description Loads the post data requested by the url.
  */
  componentDidMount(){
    this.loadPost(this.props.match.params.id);
  }
  /*
  * @description  Loads the post and its comments matching the id requested.
  * @param {string} filter - the id of the post data to load.
  */
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
  /*
  * @description  triggers the vote process to alter the post score.
  * @param {object} postItem - to post which score needs to be modified.
  * @param {string} voteValue - the indicate of increasing or decreasing the score
  * of the post item.
  */
  vote = (postItem,voteValue) => {
    APIInterface.votePost(postItem.id, voteValue).then((postItem)=>{
      this.props.votePostItem(postItem);
    });
  }
  /*
  * @description  opens the dialog view.
  */
  openEditModal = () => {
    this.setState({showModal:true});
  }
  /*
  * @description  closes the dialog view.
  */
  closeEditModal = () => {
    this.setState({showModal:false});
  }
  /*
  * @description  Initialize the dialog to edit the post.
  */
  openEditPostDialog = () => {
    this.setState({modalTitle:editModalTitle});
    this.openEditModal();
  }
  /*
  * @description clears the filter data and returns to home.
  */
  returnHome = () =>{
    this.props.loadFiltered({
      filterBy:'',
      posts:[]
    });
    this.props.history.push('/');
  }
  /*
  * @description Deletes the post from the list.
  * @param {object} post - the object of the post to be deleted.
  */
  deletePost = (post) => {
    APIInterface.deletePost(post.id).then((postReponse) =>{
      this.props.deletePostItem(postReponse);
      this.returnHome();
    });
  }

  render(){
    const {post} = this.props;
    let validatePostValue = (post.postItem !== null && !(Object.keys(post.postItem).length === 0 && post.postItem.constructor === Object) && !post.postItem.hasOwnProperty('error'));
    let dateToParse;
    let postDate;
    if(validatePostValue){
      dateToParse = new Date(post.postItem.timestamp);
      postDate = dateToParse.getMonth() + '/' + dateToParse.getDay() + '/' + dateToParse.getFullYear();
    }
    return(
      <div>
      {validatePostValue === false
      ? <NotFound />
      :<div>
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
                  <Button bsStyle="link" onClick={this.returnHome}>
                    <Glyphicon glyph="home"/> Return
                  </Button>
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
              postItem={post.postItem}
              onCloseEditModal = {this.closeEditModal} />
          </Modal.Body>
        </Modal>
      </div>}
      </div>);
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
    deletePostItem: (data) => dispatch(deletePost(data)),
    loadFiltered: (data) => dispatch(postFilter(data))
  };
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(PostView));
