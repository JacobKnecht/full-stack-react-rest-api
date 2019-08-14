import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CourseDetail extends Component {
  state = {
    course: "",
    isLoading: true,
  };

  componentDidMount() {
    fetch(`${this.props.baseURL}/courses/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(course => this.setState({
        course: course[0],
        isLoading: false
      }))
      .then(() => console.log(this.state.course))
      .catch(err => console.log("There was an error loading the course: " + err))
  }

  render() {
    return (
      this.state.isLoading ? (<h2>Loading Course Information...</h2>) :
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              <span>
                <Link to={`/courses/${this.state.course.id}/update`} className="button">Update Course</Link>
                <Link to="#" className="button">Delete Course</Link>
              </span>
              <Link to="/" className="button button-secondary">Return to List</Link>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.course.title}</h3>
              <p></p>
            </div>
            <div className="course--description">
              <p>{this.state.course.description}</p>
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
                    <li>{this.state.course.materialsNeeded}</li>
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
