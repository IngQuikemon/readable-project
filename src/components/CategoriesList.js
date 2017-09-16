import React,{Component} from 'react'
import { ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class CategoriesList extends Component{
  render(){
    const {categories} = this.props;
    if(categories === undefined || categories.length === 0)
    {
      return(
        <div></div>
      );
    }else{
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
}

function mapStateToProps (state){
  return {
    categories:state.posts.categories
  };
}

export default connect(mapStateToProps)(CategoriesList)
