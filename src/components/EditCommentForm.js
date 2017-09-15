import React,{Component} from 'react';
import {Button,FormControl,FormGroup,ControlLabel} from 'react-bootstrap';
import {connect} from 'react-redux';
import {addComment,editComment} from '../actions';
import * as APIInterface from '../utils/APIInterface';

const authorIdField = 'commentAuthor';
const bodyIdField = 'commentText';
const parentIdField = 'commentParent';
const commentIdField = 'commentId';

class EditForm extends Component{
  handleSubmit = (event) => {
    this.addComment({
      id:this.commentIdInput.value,
      parentId:this.parentIdInput.value,
      author: this.commentAuthorInput.value,
      body:this.commentBodyInput.value,
      timestamp:(new Date()).getTime()
    },
    this.commentIdInput.value,
    this.parentIdInput.value);
    this.props.onCloseEditModal();
    event.preventDefault();
  }

  addComment = (comment,commentId,parentId) => {
    let commentValue = null;
    if(comment.id === ''){
      commentValue = {
        id : APIInterface.idGenerator(),
        parentId : parentId,
        timestamp :comment.timestamp,
        author : comment.author,
        body : comment.body
      };
      APIInterface.addComment(commentValue).then((comment) =>{
          this.props.add(comment);
      });
    }else{
      commentValue ={
        body : comment.body,
        timestamp : comment.timestamp
      }
      APIInterface.editComment(commentValue,commentId).then((comment) =>{
        this.props.edit(comment);
      });
    }
  }

  render(){
    const {commentItem} = this.props;
    return(
      <form onSubmit={this.handleSubmit}>
        <FormControl
          id={parentIdField}
          inputRef={ref => {this.parentIdInput = ref}}
          value={commentItem.parentId}
          type="hidden"/>
        <FormControl
          id={commentIdField}
          inputRef={ref => {this.commentIdInput = ref}}
          value={commentItem.id}
          type="hidden"/>
        <FormGroup controlId={authorIdField}>
          <ControlLabel>Author</ControlLabel>
          <FormControl id={authorIdField}
            placeholder="Type your name"
            defaultValue={commentItem.author}
            inputRef={ref => {this.commentAuthorInput = ref}}>
          </FormControl>
        </FormGroup>
        <FormGroup controlId={bodyIdField}>
          <ControlLabel>Comment text</ControlLabel>
          <FormControl id={bodyIdField}
            placeholder="Type your comment"
            defaultValue={commentItem.body}
            componentClass="textarea"
            inputRef={ref => {this.commentBodyInput = ref}}>
          </FormControl>
        </FormGroup>
        <Button type="submit" >Save</Button>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch){
  return {
    add: (data) => dispatch(addComment(data)),
    edit: (data) => dispatch(editComment(data))
  }
}

export default connect(null,mapDispatchToProps)(EditForm);
