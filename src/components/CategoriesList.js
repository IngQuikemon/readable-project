import React,{Component} from 'react'
import { ListGroup, ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class CategoriesList extends Component{
  render(){
    const {categories,filter} = this.props;
    console.log(filter);
    return(
      <div>
      {categories === undefined || categories.length === 0
        ? <div></div>
        :<div className="menu_holder">
          <h3>Categories:</h3>
          <ListGroup >
            <ListGroupItem key="0" active={ filter === "" ? `active` : ``}><Link to="/">All</Link></ListGroupItem>
            {categories.map((item,index) => (
              <ListGroupItem key={index}  active={ filter === item.name ? `active` : ``}><Link to={`/filtered/${item.path}`}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Link></ListGroupItem>
            ))}
          </ListGroup>
        </div>
      }
      </div>
    )
  }
}

function mapStateToProps (state){
  return {
    categories:state.posts.categories,
    filter:state.posts.filterBy
  };
}

export default connect(mapStateToProps)(CategoriesList)
