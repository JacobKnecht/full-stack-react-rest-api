import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class CreateCourse extends Component {
  state = {
    courseTitle: "",
    courseDescription: "",
    courseEstimatedTime: "",
    courseMaterialsNeeded: "",
  };

  returnToList(e) {
    e.preventDefault();
    window.location.assign("/");
  }

  updateCourseTitle(e) {
    this.setState({ courseTitle: e.target.value });
  }

  updateCourseEstimatedTime(e) {
    this.setState({ courseEstimatedTime: e.target.value });
  }

  render() {
    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          {/*Need to find a way to dynamically render the validation renders only when user submits form*/}
          <div>
            <h2 className="validation--errors--label">Validation errors</h2>
            <div className="validation-errors">
              <ul>
                <li>Please provide a value for "Title"</li>
                <li>Please provide a value for "Description"</li>
              </ul>
            </div>
          </div>
          <form action={`${this.props.baseURL}/courses`} method="post">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input id="title" name="title" type="text"
                    className="input-title course--title--input"
                    placeholder="Course title..." value={this.courseTitle}
                    onChange={this.updateCourseTitle}/>
                </div>
                {/*Need to put authenticated user's name in the following <p> tag*/}
                <p>By Enter Name</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea id="description" name="description" className=""
                    placeholder="Course description..."></textarea>
                </div>
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                      <input id="estimatedTime" name="estimatedTime" type="text"
                        className="course--time--input" placeholder="Hours"
                        value={this.courseEstimatedTime} onChange={this.updateCourseEstimatedTime} />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea id="materialsNeeded" name="materialsNeeded"
                        className="" placeholder="List materials..."></textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Create Course</button>
              <button className="button button-secondary" onClick={this.returnToList}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateCourse;
