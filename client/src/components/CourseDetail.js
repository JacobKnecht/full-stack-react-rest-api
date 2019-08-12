import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CourseDetail extends Component {
  state = {
    course: {},
  };

  componentDidMount() {
    fetch(`${this.props.baseURL}/courses/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(course => this.setState({ course: course }))
      .then(() => console.log(this.state.course))
      .catch(err => console.log("There was an error loading the course: " + err))
  }

  render() {
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <Link to="#" className="button">Update Course</Link>
                <Link to="#" className="button">Delete Course</Link>
              </span>
              <Link to="/" className="button button-secondary">Return to List</Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 class="course--label">Course</h4>
              <h3 class="course--title">{course.title}</h3>
              <p>By {course.user.firstName} {course.user.lastName}</p>
            </div>
            <div class="course--description">
              <p>{course.description}</p>
            </div>
          </div>
          <div class="grid-25 grid-right">
            <div class="course--stats">
              <ul class="course--stats--list">
                <li class="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{course.estimatedTime}</h3>
                </li>
                <li class="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <li>{course.materialsNeeded}</li>
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

export default CourseDetail;
