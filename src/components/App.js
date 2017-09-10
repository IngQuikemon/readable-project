import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import AllPosts from './AllPosts';
import FilteredCategories from './FilteredCategories';
import PostView from './PostView';
import * as APIInterface from '../utils/APIInterface'

class App extends Component {
  state = {
    posts : [],
    postsByCategories : [],
    categories: [],
    postItem : null,
    comments : []
  }
  componentDidMount(){
    this.loadCategories();
    this.loadPosts();
  }

  loadCategories = () => {
    APIInterface.getCategories().then((categories) =>{
      this.setState({categories});
    });
  }

  loadPosts = () => {
    APIInterface.getPosts().then((posts) => {
      this.setState({posts});
    });
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
      this.setState({comments});
    })
  }

  addComment = (comment) => {
    if(comment.id === null){
      comment.id = APIInterface.idGenerator();
    }
    console.log(JSON.stringify({ comment}));
    APIInterface.addComment(comment);
    this.loadPostItem(comment.parentId);
  }

  render(){
    return(
      <div>
        <Route exact path="/" render={() =>(
            <AllPosts categories={this.state.categories}
              posts={this.state.posts} />
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
              {...props}/>
        )} />
      </div>
    )
  }
}

export default App
