import React,{Component} from 'react';
import {Button,FormControl,FormGroup,ControlLabel} from 'react-bootstrap';

class EditForm extends Component{
  handleChange = (event) => {
    console.log(event.target.value);
  }
  render(){
    return(
      <form>
        <FormGroup controlId="commentAuthor">
          <ControlLabel>Author</ControlLabel>
          <FormControl id="commentAuthor"
            placeholder="Type your name"
            onChange={this.handleChange}>
          </FormControl>
        </FormGroup>
        <FormGroup controlId="commentText">
          <ControlLabel>Comment text</ControlLabel>
          <FormControl id="commentText"
            placeholder="Type your comment"
            componentClass="textarea"
            onChange={this.handleChange}>
          </FormControl>
        </FormGroup>
        <Button>Save</Button>
      </form>
    )
  }
}

export default EditForm;
