import {
  POSTS_FILTER,
  SORT_POSTS,
  LOAD_POSTS,
  LOAD_COMMENTS_COUNT,
  LOAD_FILTERED_COMMENTS_COUNT,
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  VOTE_POST
} from '../actions/types';
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
export default function posts (state = postsInitialValue, action){
  const {post,posts,sortBy,filterBy,categories,count} = action;
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
    case LOAD_COMMENTS_COUNT:
      let commentCountResponse = state.list.map((postItem) => {
        if(postItem.id === post.id){
          return({
            ...postItem,
            commentCount:count,
          });
        }else{
          return postItem;
        }
      });
      return {
          ...state,
          list:commentCountResponse,
        };
    case LOAD_FILTERED_COMMENTS_COUNT:
      let commentFilteredCountResponse = state.filteredList.map((postItem) =>{
        if(postItem.id === post.id){
          return({
            ...postItem,
            commentCount:count,
          });
        }else{
          return postItem;
        }
      })
      return {
        ...state,
        filteredList:commentFilteredCountResponse,
      };
    case POSTS_FILTER:
      return {
        ...state,
        filterBy:filterBy,
        filteredList:[...posts].sort(sortFunction)
      }
    case ADD_POST:
      return {
        ...state,
        list:[...state.list,post].sort(sortFunction)
      };
    case VOTE_POST:
      let voteResponse =state.list.map(postItem => {
        return postItem.id === post.id
        ? {
            ...postItem,
            voteScore : post.voteScore,
          }
        : postItem;
      });
      let voteFilteredResponse = state.filteredList.map(postItem =>{
        return postItem.id === post.id
        ? {
          ...postItem,
          voteScore : post.voteScore,
          }
        : postItem;
      });
      return {
        ...state,
        list:voteResponse.sort(sortFunction),
        filteredList: voteFilteredResponse
      };
    case SORT_POSTS:
      //let sortFiltered = state.filteredList.length > 0
      //  ?
      //  : state.filteredList
      return (sortBy === state.sortBy
        ? state
        : {
          ...state,
          list: [...state.list].sort((a,b) =>
            {return a[sortBy] < b[sortBy]}),
          filteredList:  [...state.filteredList].sort((a,b)=>
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
