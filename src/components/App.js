import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import AllCategories from './AllCategories';
import FilteredCategories from './FilteredCategories';
import PostView from './PostView';
import * as APIInterface from '../utils/APIInterface'

class App extends Component {
  state = {
    posts : [],
    categories: []
  }
  componentDidMount(){
    if(this.state.categories.length === 0)
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

  render(){
    return(
      <div>
        <Route exact path="/" render={() =>(
            <AllCategories categories={this.state.categories}
              posts={this.state.posts} />
          )} />
        <Route exact path="/filtered/:category" render={props => (
            <FilteredCategories
              posts={this.state.posts}
              {...props}
              />
          )} />
        <Route path="/Post/:id" render={() =>(
            <PostView />
        )} />
      </div>
    )
  }
}

export default App
