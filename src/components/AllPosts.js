import React, {Component} from 'react'
import { Grid, Row, Col, PageHeader,Button,Glyphicon,FormControl} from 'react-bootstrap';
import PostList from './PostList';
import CategoriesList from './CategoriesList';

class AllPosts extends Component{

  render(){
    const {categories,posts,onVotePost} = this.props;
    return(
      <Grid>
        <Row className="show-grid">
          <Col md={10}>
            <PageHeader> Readable <small>a Udacity project</small></PageHeader>
            <div className="full_width">
              <Button bsStyle="link">
                <Glyphicon glyph="plus"/> Add new post
              </Button>
              <span className="button_right">
                Order by:
                  <select id="selectSort" type="select" >
                    <option value="voteScore" selected>Vote Score</option>
                    <option value="timestamp">Date Posted</option>
                  </select>
              </span>
            </div>
            <br/>
            <PostList onVotePost={onVotePost} posts={posts}/>
          </Col>
          <Col md={2}>
            <CategoriesList categories={categories} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default AllPosts
