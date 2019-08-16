import React, { Component } from 'react';
import { withRouter } from 'react-router';
import config from '../config';

class UpdateCourse extends Component {
  state = {
    id: "",
    title: "",
    description: "",
    estimatedTime: "",
    materialsNeeded: "",
    isLoading: true,
  };

  componentDidMount() {
    fetch(`${config.baseURL}/courses/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(course => this.setState({
        id: course[0].id,
        title: course[0].title,
        description: course[0].description,
        estimatedTime: course[0].estimatedTime,
        materialsNeeded: course[0].materialsNeeded,
        isLoading: false
      }))
      .catch(err => console.log("There was an error loading the course: " + err))
  }

  returnToList = (e) => {
    e.preventDefault();
    this.props.history.push("/");
  }

  updateCourseTitle = (e) => {
    this.setState({ title: e.target.value });
  }

  updateCourseDescription = (e) => {
    this.setState({ description: e.target.value });
  }

  updateCourseEstimatedTime = (e) => {
    this.setState({ estimatedTime: e.target.value });
  }

  updateCourseMaterialsNeeded = (e) => {
    this.setState({ materialsNeeded: e.target.value });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded
    } = this.state;
    const credentials = btoa(`${authUser.emailAddress}:${authUser.password}`);
    const response = await fetch(`${config.baseURL}/courses/${this.state.id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Basic ${credentials}`,
      },
      body: JSON.stringify({
        title,
        description,
        estimatedTime,
        materialsNeeded
      }),
    });
    if(response.status === 204) {
      this.props.history.push("/");
      console.log("Course Updated");
    } else {
      console.log(response);
      console.log(response.status);
      this.props.history.push("/error");
    }
  }

  render() {
    const { firstName, lastName} = this.props.context.authenticatedUser;
    return (
      this.state.isLoading ? (<h2>Loading Course Information...</h2>) :
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <div>
                  <input id="title" name="title" type="text"
                    className="input-title course--title--input"
                    placeholder="Course title..." value={this.state.title}
                    onChange={this.updateCourseTitle} />
                </div>
                <p>By {firstName} {lastName}</p>
              </div>
              <div className="course--description">
                <div>
                  <textarea id="description" name="description" className=""
                    placeholder="Course description..."
                    value={this.state.description}
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
                        value={this.state.estimatedTime}
                        onChange={this.updateCourseEstimatedTime} />
                    </div>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                      <textarea id="materialsNeeded" name="materialsNeeded"
                        className="" placeholder="List materials..."
                        value={this.state.materialsNeeded}
                        onChange={this.updateCourseMaterialsNeeded}>
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

export default withRouter(UpdateCourse);
