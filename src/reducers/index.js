import {combineReducers} from 'redux';
import {
  POSTS_FILTER,
  SORT_POSTS,
  LOAD_POSTS,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  VOTE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT,
  LOAD_CATEGORIES
} from '../actions';

const postsInitialValue = {
  list: [],
  sortBy: 'voteScore'
}

function posts (state = postsInitialValue, action){
  const {post,posts,sortBy} = action;
  const sortFunction = (a,b) => {return a[state.sortBy] < b[state.sortBy]};
  switch(action.type){
    case LOAD_POSTS:
      let loadResponse = [...state.list,...posts];
      return {
        ...state,
        list:loadResponse.sort(sortFunction)
      };
    case ADD_POST:
      return {
        ...state,
        list:[...state.list,post].sort(sortFunction)
      };
    case VOTE_POST:
      let voteResponse =state.list.map(postItem => {
        if(postItem.id === post.id){
          return({
            ...postItem,
            voteScore : post.voteScore,
          });
        }else{
          return postItem;
        }
      });
      return {
        ...state,
        list:voteResponse.sort(sortFunction)
      };
    case SORT_POSTS:
      return sortBy === state.sortBy
        ? state
        : {
          list: [...state.list].sort((a,b) =>
            {return a[sortBy] < b[sortBy]}),
          sortBy:sortBy
          }
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

      */
    default:
      return state;
  }
}

function categories (state = [],action){
  switch (action.type) {
    case LOAD_CATEGORIES:
      return [...state,action.categories];
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
