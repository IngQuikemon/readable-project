import React, {Component} from 'react'
import { Grid, Row, Col, PageHeader } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import PostList from './PostList';

class FilteredCategories extends Component {
  render(){
    const {posts} = this.props;
    const {category} = this.props.match.params;
    return(
      <Grid>
        <Row className="show-grid">
          <Col md={12}>
            <PageHeader> {category.charAt(0).toUpperCase() + category.slice(1)} <small><Link to="/"> return to main page</Link></small></PageHeader>
            <div>
              <PostList posts={posts}/>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default FilteredCategories
