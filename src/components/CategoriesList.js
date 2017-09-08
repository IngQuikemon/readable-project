import React,{Component} from 'react'
import { ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class CategoriesList extends Component{
  render(){
    const {categories} = this.props;
    return(
      <div className="menu_holder">
        <h3>Categories:</h3>
        <ListGroup >
          {categories.map((item,index) => (
            <ListGroupItem key={index}><Link to={`/filtered/${item.path}`}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Link></ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default CategoriesList
