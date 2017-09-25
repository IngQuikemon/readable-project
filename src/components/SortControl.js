import React from 'react';
import {FormControl} from 'react-bootstrap';

function SortControl(props){
  return(
    <div className="container_right">
      <span className="button_right">
        <FormControl componentClass="select" onChange={props.sortPosts} defaultValue={props.sortBy}>
          <option value="voteScore">Vote Score</option>
          <option value="timestamp">Date Posted</option>
        </FormControl>
      </span>
      <span className="button_right button_padding">
        Order by &nbsp;
      </span>
    </div>
  )
}

export default SortControl;
