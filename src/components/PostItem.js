import React, {Component} from 'react'
import {ListGroupItem, Badge } from 'react-bootstrap';

class PostItem extends Component {
  render(){
    return(
      <ListGroupItem href="#post1">
        <span className="blob_title_text">Post 1 Title</span>
        <span className="blob_title_subtext">posted on XX&#47;XX&#47;XXXX</span>
        <span className="blob_score_text">Score <Badge>XX</Badge></span>
        <br/>
        <span className="blob_body">This is some text to proof concept of content.</span>
      </ListGroupItem>
    )
  }
}

export default PostItem
