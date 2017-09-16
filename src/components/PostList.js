import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Panel} from 'react-bootstrap';
import PostItem from './PostItem';

class PostList extends Component{
  render(){
    const {posts,onVotePost} = this.props;
    return (
      <div>
      {
        posts === undefined || posts.length === 0
        ? <Panel>
            No posts found yet. Come on and start posting.
          </Panel>
        : <div>
            {posts.map((post) => (
              <PostItem
                key={post.id}
                postItem={post}
                onVotePost={onVotePost} />
            ))}
          </div>
      }
      </div>
    );
  }
}
function mapStateToProps (state){
  return {posts: state.posts.filterBy === '' ? state.posts.list : state.posts.filteredList};
}
export default connect(mapStateToProps)(PostList)
