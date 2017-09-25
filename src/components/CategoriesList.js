import React,{Component} from 'react'
import { ListGroup, ListGroupItem,Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {postFilter} from '../actions';
import * as APIInterface from '../utils/APIInterface'

class CategoriesList extends Component{

  /*
  * @description change the path of the site based on the category selected.
  * @param {string} path - The category name to change to.
  */
  changePath = (path) => {
    if(path === ""){
      this.props.loadFiltered({
        filterBy:'',
        posts:[]
      });
      this.props.history.push('/');
    }else {
      APIInterface.getPostsByCategory(path).then(
        (posts) => {
          this.props.loadFiltered({
            filterBy:path,
            posts: posts
          });
          this.props.history.push(`/${path}`);
        }
      )
    }
  }

  /*
  * @description Validates the if the path currently exist in the category list.
  * @param {string} path - the name of the path to be validated.
  */
  validatePath = (path) => {
    let responseValidation = false;
    this.props.categories.forEach((category) => {
      if(category.path === path)
        responseValidation = true;
    });
    return responseValidation;
  }
  render(){
    const {categories,filter} = this.props;
    return(
      <div>
      {categories === undefined || categories.length === 0
        ? <div></div>
        :<div className="menu_holder">
          <h3>Categories:</h3>
          <ListGroup >
            <ListGroupItem key="0" active={ filter === "" ? `active` : ``}>
              <Button bsStyle="link" onClick={() => {this.changePath("")}}>All</Button>
            </ListGroupItem>
            {categories.map((item,index) => (
              <ListGroupItem key={index}  active={ filter === item.name ? `active` : ``}>
                <Button bsStyle="link" onClick={() => {this.changePath(item.path)}}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Button>
              </ListGroupItem>
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

function mapDispatchToProps(dispatch){
  return {
    loadFiltered: (data) => dispatch(postFilter(data))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CategoriesList))
