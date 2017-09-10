import React, {Component} from 'react';
import { Grid, Row, Col, PageHeader,Panel,Badge,Button,Jumbotron,Glyphicon} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import CommentList from './CommentList';

class PostView extends Component{
  componentDidMount(){
    this.loadPost(this.props.match.params.id);
  }

  loadPost = filter =>{
    this.props.onLoadPostItem(filter);
  }

  render(){
    const {postItem, comments} = this.props;
    let dateToParse;
    let postDate;
    if(postItem !== null){
      dateToParse = new Date(postItem.timestamp);
      postDate = dateToParse.getMonth() + '/' + dateToParse.getDay() + '/' + dateToParse.getFullYear();
      return(
        <Grid>
          <Row className="show-grid">
            <Col md={12}>
              <PageHeader> {postItem.title} </PageHeader>
              <div>
                <span>posted by {postItem.author} on {postDate}. </span>
                <span> Score:<Badge>{postItem.voteScore}</Badge></span>
                <span className="button_right">
                  <Button bsStyle="link">
                    <Glyphicon glyph="pencil"/> Edit
                  </Button>
                  <Link to="/">
                    <Glyphicon glyph="home"/> Return
                  </Link>
                </span>
              </div>
              <br/>
              <Jumbotron>
                {postItem.body}
              </Jumbotron>
            <br/>
            <CommentList
              comments={comments} />
            </Col>
          </Row>
        </Grid>
      );
    }else{
      return (
        <Panel>
          The post was not found. Verify that you are selecting the right post.
        </Panel>
      );
    }
  }
}

export default PostView;
