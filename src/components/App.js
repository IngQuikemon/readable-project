import React, {Component} from 'react';
import { Grid, Row, Col, PageHeader, Nav, NavItem } from 'react-bootstrap';
import {Route, Link} from 'react-router-dom';
import PostList from './PostList';
import PostView from './PostView';

class App extends Component {
  state = {
    posts : [],
    categories: [
      {
        name: 'react',
        path: 'react'
      },
      {
        name: 'redux',
        path: 'redux'
      },
      {
        name: 'udacity',
        path: 'udacity'
      }
    ]
  }
  render(){
    return(
      <div>
        <Grid>
          <Row className="show-grid">
            <Col md={10}>
              <PageHeader> Readable <small>a Udacity project</small></PageHeader>
              <div>
                <Route exact path="/" render={() =>(
                    <PostList posts={this.state.posts}/>
                  )} />
                <Route path="/:category" component={PostList} />
                <Route path="/Post/:id" render={() =>(
                    <PostView />
                )} />
              </div>
            </Col>
            <Col md={2}>
              <div className="menu_holder">
                <h3>Categories:</h3>
                <Nav bsStyle="pills" stacked >
                  {this.state.categories.map((item,index) => (
                    <NavItem eventKey={index} ><Link to={`/${item.path}`}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Link></NavItem>
                  ))}
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
