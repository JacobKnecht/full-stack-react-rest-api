import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Courses extends Component {
  state = {
    courses: [],
    isLoading: true,
  };

  componentDidMount() {
    //attempt to fetch course list
    fetch(`${this.props.baseURL}/courses`)
      .then(response => response.json())
      .then(courses => this.setState({
        courses: courses, //set course state
        isLoading: false //no longer loading
      }))
      .catch(err => this.props.history.push("/error")); //there was an error, likely a server error
  }

  //render the list of courses
  render() {
    return (
      this.state.isLoading ? (<h2>Loading Courses...</h2>) :
      <div className="bounds">
        {
          this.state.courses.map(course => {
            return (
              <div className="grid-33" key={course.id}>
                <Link to={`/courses/${course.id}`} className="course--module course--link">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
                </Link>
              </div>
            );
          })
        }
        <div className="grid-33">
          <Link to="/courses/create" className="course--module course--add--module">
            <h3 className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px"
                y="0px" viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6"></polygon>
              </svg>
              New Course
            </h3>
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Courses);
