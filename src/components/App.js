import React, {Component} from 'react';
import { Grid, Row, Col, PageHeader, ListGroup, ListGroupItem, Badge, Nav, NavItem, Panel } from 'react-bootstrap';
import PostList from './PostList'

class App extends Component {
  state = {
    posts : []
  }
  render(){
    return(
      <div>
        <Grid>
          <Row className="show-grid">
            <Col md={10}>
              <PageHeader> Readable <small>a Udacity project</small></PageHeader>
              <div>
                <PostList posts={this.state.posts}/>
              </div>
            </Col>
            <Col md={2}>
              <div className="menu_holder">
                <h3>Categories:</h3>
                <Nav bsStyle="pills" stacked >
                  <NavItem eventKey={1} onSelect={() => {this.active = true}} active>All</NavItem>
                  <NavItem eventKey={2} onSelect={() => {this.active = true}}>Category 1</NavItem>
                  <NavItem eventKey={3} onSelect={() => {this.active = true}}>Category 2</NavItem>
                  <NavItem eventKey={4} onSelect={() => {this.active = true}}>Category 3</NavItem>
                </Nav>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default App
