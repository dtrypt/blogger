import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

class PostsIndex extends Component {
  //react lifecycle method that's automatically called after the componet shows up on DOM
  //calls actionCreator to fetch list of posts after 1st render
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    // lodash can deal with objects
    // this will return array of posts
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          {post.title}
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

//hook up to application state
function mapStateToProps(state) {
  return { posts: state.posts };
}

//mapping without using mapDispatchToProps. Use dispatch function for manipulating
export default connect(mapStateToProps, { fetchPosts })(PostsIndex);
