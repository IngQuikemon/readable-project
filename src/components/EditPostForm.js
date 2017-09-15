import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Button,FormControl,FormGroup,ControlLabel} from 'react-bootstrap';
import * as APIInterface from '../utils/APIInterface';
import {addPost,editPost} from '../actions';

const authorField = 'postAuthorField';
const bodyField = 'postBodyField';
const categoryField ='categoryField';
const idField = 'postIdField';
const titleField = 'postTitleField';

class EditPostForm extends Component{
  handleSubmit = (event) => {
    this.savePost({
      id:this.postIdInput.value,
      title:this.postTitleInput.value,
      author: this.postAuthorInput.value,
      body:this.postBodyInput.value,
      category: this.postCategoryInput.value,
      timestamp:(new Date()).getTime()
    });
    this.props.onCloseEditModal();
    event.preventDefault();
  }

  savePost = (post) => {
    let postValue = null;
    if(post.id === ''){
      postValue = {
        id : APIInterface.idGenerator(),
        title: post.title,
        timestamp :post.timestamp,
        category: post.category,
        author : post.author,
        body : post.body
      };
      APIInterface.addPost(postValue).then((post) => this.props.add(post));
    }else{
      postValue ={
        title:post.title,
        body : post.body,
        category:post.category,
        timestamp : post.timestamp
      }
      APIInterface.editPost(postValue,post.id).then((post) => this.props.edit(post));
    }
  }

  render(){
    const {postItem} = this.props;
    return(
      <form onSubmit={this.handleSubmit}>
        <FormControl
          id={idField}
          inputRef={ref => {this.postIdInput = ref}}
          value={postItem.id}
          type="hidden"/>
        <FormGroup controlId={titleField}>
          <ControlLabel>Title</ControlLabel>
          <FormControl id={titleField}
            placeholder="Type post title"
            onChange={this.handleChange}
            defaultValue={postItem.title}
            inputRef={(ref) => {this.postTitleInput = ref}}>
          </FormControl>
        </FormGroup>
        <FormGroup controlId={authorField}>
          <ControlLabel>Author</ControlLabel>
          <FormControl id={authorField}
            placeholder="Type your name"
            onChange={this.handleChange}
            defaultValue={postItem.author}
            inputRef={(ref) => {this.postAuthorInput = ref}}>
          </FormControl>
        </FormGroup>
        <FormGroup controlId={categoryField}>
          <ControlLabel>Category</ControlLabel>
            <FormControl
              componentClass="select"
              onChange={this.orderPost}
              defaultValue={postItem.category}
              inputRef={(ref)=>{this.postCategoryInput = ref}}>
              <option value="react">React</option>
              <option value="redux">Redux</option>
              <option value="udacity">Udacity</option>
            </FormControl>
        </FormGroup>
        <FormGroup controlId={bodyField}>
          <ControlLabel>Comment text</ControlLabel>
          <FormControl id={bodyField}
            placeholder="Type your post"
            componentClass="textarea"
            defaultValue={postItem.body}
            onChange={this.handleChange}
            inputRef={(ref) => {this.postBodyInput = ref}}>
          </FormControl>
        </FormGroup>
        <Button type="submit" >Save</Button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {
    add: (data) => dispatch(addPost(data)),
    edit: (data) => dispatch(editPost(data))
  }
}


export default connect(null, mapDispatchToProps)(EditPostForm);
