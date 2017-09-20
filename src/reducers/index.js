import {combineReducers} from 'redux';
import posts from './Posts';
import post from './PostComments';

export default combineReducers({
  posts,
  post,
})
