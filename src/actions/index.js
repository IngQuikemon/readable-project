export const POSTS_FILTER = 'POSTS_FILTER'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const VOTE_POST = 'VOTE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export function postFilter({categoryFilter}){
  return {
    type: POSTS_FILTER,
    categoryFilter,
  }
}

export function addPost({post}){
  return{
    type: ADD_POST,
    post,
  }
}

export function editPost({post}){
  return{
    type: EDIT_POST,
    post,
  }
}

export function deletePost({post}){
  return{
    type: DELETE_POST,
    post,
  }
}

export function votePost({post}){
  return{
    type: VOTE_POST,
    post,
  }
}

export function addComment({comment}){
  return{
    type: ADD_COMMENT,
  }
}

export function editComment({comment}){
  return{
    type: EDIT_COMMENT,
  }
}

export function deleteComment({comment}){
  return{
    type: DELETE_COMMENT,
  }
}

export function voteComment({comment}){
  return{
    type: VOTE_COMMENT,
  }
}
