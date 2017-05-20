import React, { Component } from 'react';
// reduxForm is like connect function. It allows component to talk with redux store.
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  //field argument contains event handler or 2 that make sure Field is responsible for dealing with the input.
  //field.input contains a bunch of event handlers and props. makes handlers props to input tag.
  renderField(field) {
    //meta = field.meta, for nested objects (touched, error) do this:
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    // the .bind make this === component
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      //when submit is pressed, redux-form goes through validations. Once it decides its okay,
      //it then calls the function we defined(onSubmit) and passes values out of the form to work with.
      //handleSubmit is redux side, onSubmit(function) is the callback if things are good to go.
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

//values is the values of title, categories, content
function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Enter a title!";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories!";
  }
  if (!values.content) {
    errors.content = "Enter some content please!";
  }
  // If errors is empty, form is fine to submit. Invalid if anything inside.
  return errors;
}

//wires up a bunch of diff properties as this.props to PostsNew
export default reduxForm({
  validate,
  //allows form to be unique and not share its state with other forms
  form: 'PostsNewForm'
})(
  connect(null, { createPost })(PostsNew)
);
