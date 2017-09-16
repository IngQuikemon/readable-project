import React, {Component} from 'react';
import {Route,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AllPosts from './AllPosts';
import FilteredCategories from './FilteredCategories';
import PostView from './PostView';
import * as APIInterface from '../utils/APIInterface';
import {loadPosts,votePost} from '../actions';

class App extends Component {

  /*
  * @description starts the initialization proccess
  */
  componentDidMount(){
    this.initialize();
  }

  /*
  * @description Initialize the main content of the land page
  */
  initialize = () => {
    APIInterface.getPosts().then((posts) =>{
      APIInterface.getCategories().then((categories) => {
        let postsResponse = posts.filter((post) => post.deleted === false);
        this.props.load({posts:postsResponse,
          sortingBy:'voteScore',
          categories:categories});
      })
    });
  }

  render(){
    return(
      <div>
          <Route exact path="/" render={() =>(
              <AllPosts/>
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
