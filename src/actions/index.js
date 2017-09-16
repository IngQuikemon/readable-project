export const POSTS_FILTER = 'POSTS_FILTER';
export const SORT_POSTS = 'SORT_POSTS';
export const LOAD_POSTS = 'LOAD_POSTS';
export const ADD_POST = 'ADD_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export const VOTE_POST = 'VOTE_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const LOAD_POST_ITEM = 'LOAD_POST_ITEM';

export function postFilter({filterBy,posts}){
  return {
    type: POSTS_FILTER,
    filterBy:filterBy,
    posts:posts,
  }
}

export function postSort(sortingBy){
  return{
    type:SORT_POSTS,
    sortBy: sortingBy
  }
}

export function loadPosts({posts,sortingBy,categories}){
  return{
    type:LOAD_POSTS,
    posts:posts,
    sortBy: sortingBy,
    categories:categories
  }
}

export function addPost(post){
  return{
    type: ADD_POST,
    post:post,
  }
}

export function editPost(post){
  return{
    type: EDIT_POST,
    post,
  }
}

export function deletePost(post){
  return{
    type: DELETE_POST,
    post,
  }
}

export function votePost(post){
  return{
    type: VOTE_POST,
    post:post,
  }
}

export function loadPostItem({post,comments}){
  return{
    type: LOAD_POST_ITEM,
    post:post,
    comments:comments,
  }
}

export function addComment(comment){
  return{
    type: ADD_COMMENT,
    comment:comment,
  }
}

export function editComment(comment){
  return{
    type: EDIT_COMMENT,
    comment:comment,
  }
}

export function deleteComment(comment){
  return{
    type: DELETE_COMMENT,
    comment:comment,
  }
}

export function voteComment(comment){
  return{
    type: VOTE_COMMENT,
    comment:comment,
  }
}

export function loadCategories(categories){
  return{
    type: LOAD_CATEGORIES,
    categories:categories,
  }
}
