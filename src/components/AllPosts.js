import React, {Component} from 'react';
import { Grid, Row, Col, PageHeader,Button,Glyphicon,Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import SortControl from './SortControl';
import PostList from './PostList';
import CategoriesList from './CategoriesList';
import EditPostForm from './EditPostForm';
import {postSort,postFilter} from '../actions';

const editModalTitle = 'Edit post';
const newModalTitle = 'New post';

class AllPosts extends Component{
  state = {
    showModal:false,
    modalTitle:'',
    postItem:null
  }
  componentDidMount(){
    this.props.loadFiltered({
      filterBy:'',
      posts:[]
    });
  }

  /*
  * @description Refresh the list sorting it by the value selected.
  * @param {object} event - contains the control event information.
  */
  orderPosts = (event) => {
    this.props.sortListBy(event.target.value);
  }
  /*
  * @description Opens the Modal view.
  */
  openEditModal = () => {
    this.setState({showModal:true});
  }
  /*
  * @description Closes the Modal view.
  */
  closeEditModal = () => {
    this.setState({showModal:false});
  }
  /*
  * @description Starts the edit modal view.
  * @param {object} post - the content of the post to be edited or null in case
  *  of being a new post.
  */
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
    const {posts} = this.props;
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
                <SortControl
                  sortPosts={this.orderPosts}
                  sortBy={posts.sortBy} />
              </div>
              <br/>
              <PostList/>
            </Col>
            <Col md={2}>
              <CategoriesList />
            </Col>
          </Row>
        </Grid>
        <Modal show={this.state.showModal} onHide = {this.closeEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditPostForm
              postItem={this.state.postItem}
              onCloseEditModal = {this.closeEditModal} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
function mapStateToProps ({posts}){
  return{
    posts : posts
  }
}
function mapDispatchToProps(dispatch){
  return {
    sortListBy: (data) => dispatch(postSort(data)),
    loadFiltered: (data)=> dispatch(postFilter(data))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AllPosts)
