import {combineReducers} from 'redux';
import {
  POSTS_FILTER,
  LOAD_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  VOTE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT
} from '../actions';



function posts (state = [], action){
  const {post,posts} = action;
  console.log(posts);
  switch(action.type){
    case LOAD_POSTS:
      return state.concat(posts);

    case ADD_POST:
      return [...state,post];
      /*
    case EDIT_POST:
      return {
        state.posts.map((postItem) =>
        {
          if(postItem.id === post.id){
            return({
              ...postItem,
              title: post.title,
              body : post.body,
              category: post.category,
              timestamp : post.timestamp,
            })
          }
        })
      };
    case DELETE_POST:
      return {
        state.posts.filter( postItem => postItem.id !== post.id )
      };
    case VOTE_POST:
      return {state.posts.map( postItem => {
        if(postItem.id === post.id){
          return({
            ...postItem,
            voteScore : post.voteScore,
          })
        }
      })};
      */
    default:
      return state;
  }
}

function comment (state = {}, action){
  const {comment} = action;

  switch(action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        comment,
      }
      /*
    case EDIT_COMMENTT:
      return {state.map( commentItem =>{
        if(postItem.id === post.id){
          return({
            ...commentItem,
            body : comment.body,
            timestamp : comment.timestamp,
          });
        }
      })}
    case DELETE_COMMENT:
      return {
        state.filter( commentItem => commentItem.id !== comment.id);
      };
    case VOTE_COMMENT:
      return {
        return {state.map( commentItem => {
          if(commentItem.id === comment.id){
            return({
              ...commentItem,
              voteScore : comment.voteScore,
            })
          }
        })}
      }
      */
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  comment,
})