import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import AllPosts from './AllPosts';
import FilteredCategories from './FilteredCategories';
import PostView from './PostView';
import * as APIInterface from '../utils/APIInterface'
import {loadPosts,addPost, editPost, deletePost,votePost} from '../actions';

class App extends Component {
  state = {
    postsByCategories : [],
    categories: [],
    postItem : null,
    comments : [],
    postOrderBy : 'voteScore'
  }
  componentWillMount(){
    this.loadPosts();
  }

  loadPosts = () => {
    APIInterface.getPosts().then((posts) =>{
      let postsResponse = posts.filter((post) => post.deleted === false);
      this.props.load(postsResponse);
    });
  }

  setSortBy = (orderBy) => {
    this.setState({postOrderBy:orderBy});
  }

  sortPosts = (posts) => {
    let orderBy = this.state.postOrderBy;
    posts.sort((a,b) =>{
      return b[orderBy] - a[orderBy];
    });
    this.setState({posts:posts});
  }

  loadCategories = () => {
    APIInterface.getCategories().then((categories) =>{
      this.setState({categories});
    });
  }



  addPost = (post) => {
    let postValue = null;
    if(post.id === ''){
      postValue = {
        id : APIInterface.idGenerator(),
        title: post.title,
        timestamp :post.timestamp,
        author : post.author,
        body : post.body
      };
      APIInterface.addPost(postValue).then((post) => this.props.add(post));
      //this.loadPosts();
    }else{
      postValue ={
        title:post.title,
        body : post.body,
        timestamp : post.timestamp
      }
      APIInterface.editPost(postValue,post.id);
      this.loadPostItem(post.id);
    }
  }

  deletePost = (post) => {
    APIInterface.deletePost(post.id);
    this.loadPosts();
  }

  loadPostsByCategory = (filter) => {
    APIInterface.getPostsByCategory(filter).then((postsByCategories) =>{
      this.setState({postsByCategories});
    });
  }

  loadPostItem = (filter) => {
    APIInterface.getPost(filter).then((postItem) =>{
      this.setState({postItem});
    })
    this.loadComments(filter);
  }

  votePost = (postItem,voteValue,source) => {
    APIInterface.votePost(postItem.id,voteValue);
    source === 'item' ? this.loadPostItem(postItem.id) : this.loadPosts();
  }

  loadComments = (filter) => {
    APIInterface.getComments(filter).then((comments) =>{
      comments.sort((a,b) => {
       return b.voteScore - a.voteScore;
      })
      this.setState({comments});
    })
  }

  addComment = (comment,commentId,parentId) => {
    let commentValue = null;
    if(comment.id === ''){
      commentValue = {
        id : APIInterface.idGenerator(),
        parentId : parentId,
        timestamp :comment.timestamp,
        author : comment.author,
        body : comment.body
      };
      APIInterface.addComment(commentValue);
    }else{
      commentValue ={
        body : comment.body,
        timestamp : comment.timestamp
      }
      APIInterface.editComment(commentValue,commentId);
    }
    this.loadPostItem(parentId);
  }

  deleteComment = (comment) => {
    APIInterface.deleteComment(comment.id);
    this.loadPostItem(comment.parentId);
  }
  voteComment = (id,voteValue,parentId) => {
    APIInterface.voteComment(id,voteValue);
    this.loadPostItem(parentId);
  }

  render(){
    const {posts} = this.props;
    console.log(this.props);
    return(
      <div>
          <Route exact path="/" render={() =>(
              <AllPosts categories={this.state.categories}
                posts={posts}
                onSortPosts={this.sortPosts}
                onSetSortBy={this.setSortBy}
                sortBy = {this.state.postOrderBy}
                onVotePost={this.votePost}
                onSavePost={this.addPost}/>
            )} />
          <Route exact path="/filtered/:category" render={props => (
              <FilteredCategories
                posts={this.state.postsByCategories}
                onLoadByCategory = {this.loadPostsByCategory}
                {...props}
                />
            )} />
          <Route path="/posts/:id" render={props =>(
              <PostView
                postItem = {this.state.postItem}
                comments = {this.state.comments}
                onLoadPostItem = {this.loadPostItem}
                onLoadComments = {this.loadComments}
                onGenerateId={APIInterface.idGenerator}
                onSaveComment={this.addComment}
                onVoteComment={this.voteComment}
                onDeleteComment={this.deleteComment}
                onVotePost={this.votePost}
                onDeletePost={this.deletePost}
                onSavePost={this.addPost}
                {...props}/>
          )} />
      </div>
    )
  }
}


function mapStateToProps ({state}){
  return{
    posts : state
  }
}

function mapDispatchToProps(dispatch){
  return {
    load: (data) => dispatch(loadPosts(data)),
    add: (data) => dispatch(addPost(data)),
    edit: (data) => dispatch(editPost(data)),
    delete: (data) => dispatch(deletePost(data)),
    vote: (data) => dispatch(votePost(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
