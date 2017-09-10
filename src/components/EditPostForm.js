import React,{Component} from 'react';
import {Button,FormControl,FormGroup,ControlLabel} from 'react-bootstrap';

const authorField = 'postAuthorField';
const bodyField = 'postBodyField';
const idField = 'postIdField';

class EditPostForm extends Component{
  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <FormControl
          id={parentIdField}
          inputRef={ref => {this.parentIdInput = ref}}
          value={this.props.parentId}
          type="hidden"/>
        <FormControl
          id={commentIdField}
          inputRef={ref => {this.commentIdInput = ref}}
          value={this.props.id}
          type="hidden"/>
        <FormGroup controlId={authorIdField}>
          <ControlLabel>Author</ControlLabel>
          <FormControl id={authorIdField}
            placeholder="Type your name"
            onChange={this.handleChange}>
          </FormControl>
        </FormGroup>
        <FormGroup controlId={bodyIdField}>
          <ControlLabel>Comment text</ControlLabel>
          <FormControl id={bodyIdField}
            placeholder="Type your comment"
            componentClass="textarea"
            onChange={this.handleChange}>
          </FormControl>
        </FormGroup>
        <Button type="submit" >Save</Button>
      </form>
    );
  }
}

export default EditPostForm;
