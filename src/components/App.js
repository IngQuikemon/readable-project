import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import AllCategories from './AllCategories';
import FilteredCategories from './FilteredCategories';
import PostView from './PostView';

class App extends Component {
  state = {
    posts : [],
    categories: [
      {
        name: 'react',
        path: 'react'
      },
      {
        name: 'redux',
        path: 'redux'
      },
      {
        name: 'udacity',
        path: 'udacity'
      }
    ]
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
