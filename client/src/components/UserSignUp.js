import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class UserSignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmationPassword: "",
    errors: [],
  };

  returnToList = (e) => {
    e.preventDefault();
    this.props.history.push("/");
  }

  updateUserFirstName = (e) => {
    this.setState({ firstName: e.target.value });
  }

  updateUserLastName = (e) => {
    this.setState({ lastName: e.target.value });
  }

  updateUserEmailAddress = (e) => {
    this.setState({ emailAddress: e.target.value });
  }

  updateUserPassword = (e) => {
    this.setState({ password: e.target.value });
  }

  updateConfirmationPassword = (e) => {
    this.setState({ confirmationPassword: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.password === this.state.confirmationPassword) {
      const { context } = this.props;
      const {
        firstName,
        lastName,
        emailAddress,
        password
      } = this.state;
      context.actions.signUp({
        firstName,
        lastName,
        emailAddress,
        password
      })
        .then(errors => {
          console.log(errors);
          if(errors.length) {
            this.setState({ errors });
          } else {
            this.props.history.push("/");
            console.log(`${this.state.firstName} ${this.state.lastName} successfully signed up`);
          }
        })
        .catch(err => {
          console.log(err);
          this.props.history.push("/error");
        });
    } else {
      throw new Error("There was an error during the sign-up process -- sign-up form submission");
    }
  }

  render() {
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input id="firstName" name="firstName" type="text" className=""
                  placeholder="First Name" value={this.state.firstName}
                  onChange={this.updateUserFirstName} />
              </div>
              <div>
                <input id="lastName" name="lastName" type="text" className=""
                  placeholder="Last Name" value={this.state.lastName}
                  onChange={this.updateUserLastName} />
              </div>
              <div>
                <input id="emailAddress" name="emailAddress" type="text" className=""
                  placeholder="Email Address" value={this.state.emailAddress}
                  onChange={this.updateUserEmailAddress} />
              </div>
              <div>
                <input id="password" name="password" type="password" className=""
                  placeholder="Password" value={this.state.password}
                  onChange={this.updateUserPassword} />
              </div>
              <div>
                <input id="confirmPassword" name="confirmPassword" type="password"
                  className="" placeholder="Confirm Password" value={this.state.confirmationPassword}
                  onChange={this.updateConfirmationPassword} />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">Sign Up</button>
                <button className="button button-secondary" onClick={this.returnToList}>Cancel</button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
        </div>
      </div>
    );
  }
}

export default withRouter(UserSignUp);
