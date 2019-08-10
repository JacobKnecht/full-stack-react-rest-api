import React, { Component } from 'react';


class App extends Component {
  state = {
    courses : [],
    isLoading : true,
  }
  componentDidMount() {
    fetch(`http://localhost:5000/api/courses`)
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
      <div className="container">
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
    );
  }
}

export default App;
