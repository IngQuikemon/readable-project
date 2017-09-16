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
  LOAD_POST_ITEM
} from '../actions';

/*
* @description contains the initial value of the state object for the posts reducer.
*/
const postsInitialValue = {
  list: [],
  sortBy: 'voteScore',
  filterBy: '',
  categories: [],
  filteredList: []
}

/*
* @description Handles the posts reducer to display and manage the general post list.
* @param {object} state - contains the data managed by the store related to posts.
* @param {object} action - contains the action information to execute the changes
* to the data that will be returned to the store.
*/
function posts (state = postsInitialValue, action){
  const {post,posts,sortBy,filterBy,categories} = action;
  const sortFunction = (a,b) => {return a[state.sortBy] < b[state.sortBy];};
  switch(action.type){
    case LOAD_POSTS:
      let loadResponse = [...state.list,...posts];
      return {
        ...state,
        categories: [...state.categories,...categories],
        list:loadResponse
          .sort(sortFunction)
      };
    case POSTS_FILTER:
      return {
        ...state,
        filterBy:filterBy,
        filteredList:[...posts]
      }
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
      return (sortBy === state.sortBy
        ? state
        : {
          ...state,
          list: [...state.list].sort((a,b) =>
            {return a[sortBy] < b[sortBy]}),
          sortBy:sortBy
          }
        )
    case EDIT_POST:
      return {
        ...state,
        list:state.list.map((postItem) =>
        {
          if(postItem.id === post.id){
            return{
              ...postItem,
              title: post.title,
              body : post.body,
              category: post.category,
              timestamp : post.timestamp,
            };
          }else{
            return postItem;
          }
        })
      };
    case DELETE_POST:
      return {
        ...state,
        list: state.list.filter((postItem) =>{
          return postItem.id !== post.id;
        })
      };
    default:
      return state;
  }
}
/*
* @description contains the initial state value of the post reducer.
*/
const initialPostValue ={
  postItem:null,
  comments: []
}
/*
* @description Handles the posts reducer to display and manage the general post item
  and its comment list.
* @param {object} state - contains the data managed by the store related to posts.
* @param {object} action - contains the action information to execute the changes
* to the data that will be returned to the store.
*/
function post (state = initialPostValue, action){
  const {post,comments,comment} = action;

  switch(action.type) {
    case LOAD_POST_ITEM:
      return {
        //...state,
        postItem : post,
        comments: comments
      }
    case EDIT_POST:
      return {
        ...state,
        postItem: post
      }
    case VOTE_POST:
      return{
        ...state,
        postItem: {
          ...state.postItem,
          voteScore:post.voteScore
        }
      }
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments,comment],
      }
    case DELETE_POST:
      return{
        postItem:null,
        comments:[]
      }
    case EDIT_COMMENT:
      return {
        ...state,
        comments:state.comments.map((commentItem) =>{
          if(commentItem.id === comment.id){
            return({
              ...commentItem,
              body : comment.body,
              timestamp : comment.timestamp,
            });
          }
          else{
            return commentItem;
          }
        })
      }
    case DELETE_COMMENT:
      return {
        ...state,
        comments:state.comments.filter((commentItem) =>{return commentItem.id !== comment.id})
      };
    case VOTE_COMMENT:
      return {
        ...state,
        comments: state.comments.map((commentItem) => {
          if(commentItem.id === comment.id){
            return({
              ...commentItem,
              voteScore : comment.voteScore,
            })
          }
          else{
            return commentItem;
          }
        })}
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  post,
})
