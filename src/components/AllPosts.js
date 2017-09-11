import React, {Component} from 'react'
import { Grid, Row, Col, PageHeader,Button,Glyphicon,FormControl,Modal} from 'react-bootstrap';
import PostList from './PostList';
import CategoriesList from './CategoriesList';
import EditPostForm from './EditPostForm';

const editModalTitle = 'Edit post';
const newModalTitle = 'New post';

class AllPosts extends Component{
  state = {
    showModal:false,
    modalTitle:'',
    postItem:null
  }
  orderPost = (event) => {
    this.props.onSetSortBy(event.target.value);
    this.props.onSortPosts(this.props.posts);
  }
  openEditModal = () => {
    this.setState({showModal:true});
  }
  closeEditModal = () => {
    this.setState({showModal:false});
  }

  openEditPostDialog = (post) => {
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

  render(){
    const {categories,posts,onVotePost,orderBy,onSavePost} = this.props;
    return(
      <div>
        <Grid>
          <Row className="show-grid">
            <Col md={10}>
              <PageHeader> Readable <small>a Udacity project</small></PageHeader>
              <div className="full_width">
                <Button bsStyle="link" onClick={() => this.openEditPostDialog(null)}>
                  <Glyphicon glyph="plus"/> Add new post
                </Button>
                <span className="button_right">
                  <FormControl componentClass="select" onChange={this.orderPost} value={orderBy}>
                    <option value="voteScore">Vote Score</option>
                    <option value="timestamp">Date Posted</option>
                  </FormControl>
                </span>
                <span className="button_right button_padding">
                  Order by &nbsp;
                </span>
              </div>
              <br/>
              <PostList onVotePost={onVotePost} posts={posts}/>
            </Col>
            <Col md={2}>
              <CategoriesList categories={categories} />
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
  }
}

export default AllPosts
