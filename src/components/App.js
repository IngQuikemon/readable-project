import React, {Component} from 'react';
import {Route,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AllPosts from './AllPosts';
import FilteredCategories from './FilteredCategories';
import PostView from './PostView';
import * as APIInterface from '../utils/APIInterface';
import {loadPosts,votePost} from '../actions';

class App extends Component {
  state = {
    postsByCategories : [],
    categories: [],
    postItem : null,
    comments : []
  }
  componentWillMount(){
    this.initialize();
  }

  initialize = () => {
    APIInterface.getPosts().then((posts) =>{
      let postsResponse = posts.filter((post) => post.deleted === false);
      this.props.load({posts:postsResponse,sortingBy:'voteScore'});
    });
    this.loadCategories();
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

  loadComments = (filter) => {
    APIInterface.getComments(filter).then((comments) =>{
      comments.sort((a,b) => {
       return b.voteScore - a.voteScore;
      })
      this.setState({comments});
    })
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
    return(
      <div>
          <Route exact path="/" render={() =>(
              <AllPosts categories={this.state.categories}
                onSortPosts={this.sortPosts}
                onSetSortBy={this.setSortBy}
                sortBy = {this.state.postOrderBy}
                onVotePost={this.votePost}/>
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
                onLoadComments = {this.loadComments}
                onGenerateId={APIInterface.idGenerator}
                onSaveComment={this.addComment}
                onVoteComment={this.voteComment}
                onDeleteComment={this.deleteComment}
                onDeletePost={this.deletePost}
                onSavePost={this.addPost}
                {...props}/>
          )} />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    load: (data) => dispatch(loadPosts(data)),
    vote: (data) => dispatch(votePost(data))
  }
}


export default withRouter(connect(null, mapDispatchToProps)(App))
