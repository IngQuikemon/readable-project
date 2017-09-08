import React, {Component} from 'react'
import { Grid, Row, Col, PageHeader} from 'react-bootstrap';
import PostList from './PostList';
import CategoriesList from './CategoriesList';

class AllCategories extends Component{

  render(){
    const {categories,posts} = this.props;
    return(
      <Grid>
        <Row className="show-grid">
          <Col md={10}>
            <PageHeader> Readable <small>a Udacity project</small></PageHeader>
            <PostList posts={posts}/>
          </Col>
          <Col md={2}>
            <CategoriesList categories={categories} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default AllCategories
