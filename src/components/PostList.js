import React,{Component} from 'react'
import {Panel} from 'react-bootstrap'
import PostItem from './PostItem'

class PostList extends Component{
  render(){
    const {posts,onVotePost} = this.props;
    if(posts === undefined || posts.length === 0){
      return (
        <Panel>
          No posts found yet. Come on and start posting.
        </Panel>
      );
    }
    else{
      return(
        <div>
          {posts.map((post) => (
            <PostItem
              key={post.id}
              postItem={post}
              onVotePost={onVotePost} />
          ))}
        </div>
      );
    }
  }
}

export default PostList
