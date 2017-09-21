import * as Constants from './types.js';

export function postFilter({filterBy,posts}){
  return {
    type: Constants.POSTS_FILTER,
    filterBy:filterBy,
    posts:posts,
  }
}

export function postSort(sortingBy){
  return{
    type: Constants.SORT_POSTS,
    sortBy: sortingBy,
  }
}

export function loadPosts({posts,sortingBy,categories}){
  return{
    type: Constants.LOAD_POSTS,
    posts:posts,
    sortBy: sortingBy,
    categories:categories,
  }
}

export function loadCommentsCount({post,count}){
  return {
    type: Constants.LOAD_COMMENTS_COUNT,
    post:post,
    count:count,
  }
}

export function addPost(post){
  return{
    type: Constants.ADD_POST,
    post:post,
  }
}

export function editPost(post){
  return{
    type: Constants.EDIT_POST,
    post,
  }
}

export function deletePost(post){
  return{
    type: Constants.DELETE_POST,
    post,
  }
}

export function votePost(post){
  return{
    type: Constants.VOTE_POST,
    post:post,
  }
}

export function loadPostItem({post,comments}){
  return{
    type: Constants.LOAD_POST_ITEM,
    post:post,
    comments:comments,
  }
}

export function addComment(comment){
  return{
    type: Constants.ADD_COMMENT,
    comment:comment,
  }
}

export function editComment(comment){
  return{
    type: Constants.EDIT_COMMENT,
    comment:comment,
  }
}

export function deleteComment(comment){
  return{
    type: Constants.DELETE_COMMENT,
    comment:comment,
  }
}

export function voteComment(comment){
  return{
    type: Constants.VOTE_COMMENT,
    comment:comment,
  }
}

export function loadCategories(categories){
  return{
    type: Constants.LOAD_CATEGORIES,
    categories:categories,
  }
}
