import React, { Component } from 'react';

class UpdateCourse extends Component {
  state = {
    course: "",
    courseTitle: "",
    courseEstimatedTime: "",
    courseDescription: "",
    isLoading: true,
  };

  componentDidMount() {
    fetch(`${this.props.baseURL}/courses/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(course => this.setState({
        course: course[0],
        isLoading: false
      }))
      .catch(err => console.log("There was an error loading the course: " + err))
  }

  returnToList(e) {
    e.preventDefault();
    window.location.assign("/");
  }

  updateCourseTitle(e) {
    this.setState({ courseTitle: e.target.value });
  }

  updateCourseDescription(e) {
    this.setState({ courseTitle: e.target.value });
  }

  updateCourseEstimatedTime(e) {
    this.setState({ courseEstimatedTime: e.target.value });
  }

  render() {
    return (
      this.state.isLoading ? (<h2>Loading Course Information...</h2>) :
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <form action={`${this.props.baseURL}/courses/${this.state.course.id}`} method="put">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input id="title" name="title" type="text"
                    className="input-title course--title--input"
                    placeholder="Course title..." value={this.state.courseTitle}
                    onChange={this.updateCourseTitle} />
                </div>
                <p>By {this.state.course.user.firstName} {this.state.course.user.lastName}</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea id="description" name="description" className=""
                    placeholder="Course description..."
                    value={
                      (this.state.course.description) ?
                      this.state.course.description :
                      this.state.courseDescription
                    }
                    onChange={this.updateCourseDescription}>
                  </textarea>
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
                        value={
                          (this.state.course.estimatedTime) ?
                          this.state.course.estimatedTime :
                          this.state.courseEstimatedTime
                        }
                        onChange={this.updateCourseEstimatedTime} />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea id="materialsNeeded" name="materialsNeeded"
                        className="" placeholder="List materials...">
                          {/*Need to find a way to break down materials needed lists*/}
                          {this.state.course.materialsNeeded}
                      </textarea>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid-100 pad-bottom">
              <button className="button" type="submit">Update Course</button>
              <button className="button button-secondary" onClick={this.returnToList}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateCourse;
