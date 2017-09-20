import {
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  VOTE_COMMENT,
  LOAD_POST_ITEM,
  EDIT_POST,
  DELETE_POST,
  VOTE_POST
} from '../actions/types';
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
export default function post (state = initialPostValue, action){
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
