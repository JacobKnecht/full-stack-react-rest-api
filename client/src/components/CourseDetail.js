import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import ReactMarkdown from 'react-markdown';

class CourseDetail extends Component {
  _isMounted = false;

  state = {
    course: "",
    isLoading: true,
  };

  componentDidMount() {
    //set mount status
    this._isMounted = true;
    //attempt to fetch course information
    fetch(`${this.props.baseURL}/courses/${this.props.match.params.id}`)
      .then(response => {
        if(response.status === 404) {
          this.props.history.push("/notfound"); //check for non-existent resources
        }
        return response.json();
      })
      .then(course => {
        if(this._isMounted) { //on set state if component is mounted
          this.setState({
            course: course[0], //set course state
            isLoading: false //no longer loading
          })
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push("/error"); //there was an error, likely a server error
      })
  }

  //unmount the component, important for 404/not found error handling to prevent memory leaks
  componentWillUnmount() {
    this._isMounted = false;
  }

  //delete handler
  handleDelete = (e) => {
    e.preventDefault();
    //obtain authenticated user state and credentials
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const credentials = btoa(`${authUser.emailAddress}:${authUser.password}`);
    //sset DELETE request options
    const options = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${credentials}`,
      },
    };
    //send DELETE request, user must be authenticated
    fetch(`${this.props.baseURL}/courses/${this.state.course.id}`, options)
      .then(response => {
        if(response.status === 401) {
          this.props.history.push("/forbidden"); //user isn't authorized to delete course, they don't own the coures
        } else {
          this.props.history.push("/");
        }
      })
      .catch(err => {
        console.log(err);
        this.props.history.push("/error"); //there was an error, likely a server error
      });
  }

  //render course info and details for a single course
  render() {
    const { context} = this.props;
    const authUser = context.authenticatedUser;
    return (
      this.state.isLoading ? (<h2>Loading Course Information...</h2>) :
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              {
                (authUser && authUser.id === this.state.course.user.id) &&
                <span>
                  <Link to={`/courses/${this.state.course.id}/update`}
                    className="button">Update Course</Link>
                  <Link to="/" className="button"
                    onClick={this.handleDelete}>Delete Course</Link>
                </span>
              }
              <Link to="/" className="button button-secondary">Return to List</Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.course.title}</h3>
              <p>By {this.state.course.user.firstName} {this.state.course.user.lastName}</p>
            </div>
            <div className="course--description">
              <ReactMarkdown source={this.state.course.description} />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    {/*Need to find a way to break down materials needed lists*/}
                    <ReactMarkdown source={this.state.course.materialsNeeded} />
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CourseDetail);
