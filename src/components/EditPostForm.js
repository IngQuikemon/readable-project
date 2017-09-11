import React,{Component} from 'react';
import {Button,FormControl,FormGroup,ControlLabel} from 'react-bootstrap';

const authorField = 'postAuthorField';
const bodyField = 'postBodyField';
const idField = 'postIdField';
const titleField = 'postTitleField';

class EditPostForm extends Component{
  handleSubmit = (event) => {
    this.props.onSavePost({
      id:this.postIdInput.value,
      title:this.postTitleInput.value,
      author: this.postAuthorInput.value,
      body:this.postBodyInput.value,
      timestamp:(new Date()).getTime()
    });
    this.props.onCloseEditModal();
    event.preventDefault();
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

export default EditPostForm;
