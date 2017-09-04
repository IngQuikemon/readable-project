import React,{Component} from 'react'
import {ListGroup,Panel} from 'react-bootstrap'
import PostItem from './PostItem'

class PostList extends Component{
  render(){
    const {posts} = this.props;
    if(posts.length === 0){
      return (
        <Panel>
          No posts found yet. Come on and start posting.
        </Panel>
      );
    }
    else{
      posts.map((post) => (
        <PostItem postItem={post} />
      ))
    }
  }
}

export default PostList
