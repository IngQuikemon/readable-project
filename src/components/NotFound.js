import React from 'react';
import {Panel} from 'react-bootstrap';

function NotFound(props){
  return (
    <div>
      <Panel>
        <h3>404 page not found</h3>
        <p>We are sorry but the page you are looking for is in another castle.</p>
      </Panel>
    </div>
  )
}

export default NotFound;
