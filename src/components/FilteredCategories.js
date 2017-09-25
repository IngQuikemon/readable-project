import React, {Component} from 'react'
import { Grid, Row, Col, PageHeader} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PostList from './PostList';
import CategoriesList from './CategoriesList';
import SortControl from './SortControl';
import {postFilter,postSort} from '../actions';
import * as APIInterface from '../utils/APIInterface';

class FilteredCategories extends Component {

  componentDidMount(){
    let path = this.props.match.params.category;
    if(this.props.categories.length === 0){
      APIInterface.getPostsByCategory(path).then(
        (posts) => {
          this.props.loadFiltered({
            filterBy:path,
            posts: posts
          });
        });
    }
  }

  /*
  * @description Refresh the list sorting it by the value selected.
  * @param {object} event - contains the control event information.
  */
  orderPosts = (event) => {
    this.props.sortListBy(event.target.value);
  }

  render(){
    const {category} = this.props.match.params;
    const {sortBy} = this.props;
    return(
      <Grid>
        <Row className="show-grid">
          <Col md={10}>
            <PageHeader>Showing {category.charAt(0).toUpperCase() + category.slice(1)} posts
            </PageHeader>
            <div className="full_width">
              <SortControl
                sortPosts={this.orderPosts}
                sortBy={sortBy} />
            </div>
            <br/>
            <PostList/>
          </Col>
          <Col md={2}>
            <CategoriesList />
          </Col>
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps({posts}){
  return {
    sortBy : posts.sortBy,
    categories: posts.categories
  }
}

function mapDispatchToProps(dispatch){
  return {
    loadFiltered: (data) => dispatch(postFilter(data)),
    sortListBy: (data) => dispatch(postSort(data))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(FilteredCategories))
