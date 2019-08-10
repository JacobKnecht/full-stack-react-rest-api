import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

class App extends Component {
  state = {
    baseURL: "http://localhost:5000/api",
    courses: [],
    isLoading: true,
  }

  componentDidMount() {
    fetch(`${this.state.baseURL}/courses`)
      .then(response => response.json())
      .then(courses => this.setState({
        courses : courses,
        isLoading : false
      }))
      .then(() => console.log(this.state.courses))
      .catch(err => console.log("There was an error loading the courses: " + err))
  }

  render() {
    return this.state.isLoading ? (<h2>Loading...</h2>) : (
      <BrowserRouter>
      <div id="root">
        <div>
          {
            this.state.courses.map(course => {
              return (
                <ul key={course.id}>
                  <li>{course.id}</li>
                  <li>{course.title}</li>
                  <li>{course.description}</li>
                  <li>{course.estimatedTime}</li>
                  <li>{course.materialsNeeded}</li>
                </ul>
              );
            })
          }
        </div>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
