import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Courses extends Component {
  state = {
    courses: [],
  };

  componentDidMount() {
    fetch(`${this.props.baseURL}/courses`)
      .then(response => response.json())
      .then(courses => this.setState({ courses: courses }))
      .then(() => console.log(this.state.courses))
      .catch(err => console.log("There was an error loading the courses: " + err))
  }

  render() {
    return (
      <div className="bounds">
        {
          this.state.courses.map(course => {
            return (
              <div className="grid-33" key={course.id}>
                <Link to="#" className="course--module course--link">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{course.title}</h3>
                </Link>
              </div>
            );
          })
        }
        <div className="grid-33">
          <Link to="#" className="course--module course--add--module">
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

export default Courses;