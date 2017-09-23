import React, {Component} from 'react'
import { Grid, Row, Col, PageHeader, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import PostList from './PostList';
import CategoriesList from './CategoriesList';
import {postFilter} from '../actions';
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
  * @description Clears the filter values and returns to the main page.
  */
  returnHome = (event) => {
    this.props.loadFiltered({
      filterBy:'',
      posts:[]
    });
    this.props.history.push('/');
  }

  render(){
    const {category} = this.props.match.params;
    return(
      <Grid>
        <Row className="show-grid">
          <Col md={10}>
            <PageHeader> {category.charAt(0).toUpperCase() + category.slice(1)}
              <small>
                <Button bsStyle="link" onClick={this.returnHome}> return to main page</Button>
              </small>
            </PageHeader>
            <div>
              <PostList/>
            </div>
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
    categories: posts.categories,
    filteredList : posts.filteredList
  }
}

function mapDispatchToProps(dispatch){
  return {
    loadFiltered: (data) => dispatch(postFilter(data))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(FilteredCategories))
