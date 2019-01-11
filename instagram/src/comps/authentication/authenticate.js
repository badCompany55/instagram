import React from 'react';
import {Login} from '../loginContainer/login.js';

export const highOrderFunc = Comp => {
  return class extends React.Component {
    constructor(props) {
      super();
      this.local = window.localStorage;
      this.state = {
        username: '',
        password: '',
        loggedIn: false,
      };
    }

    componentDidMount() {
      this.checkLoginStatus();
    }

    checkLoginStatus = () => {
      // comment this if statement out and uncomment the second one for code sandbox
      // this.local.clear();

      if (this.local.login !== '' && this.local.length > 0) {
        let loginInfo = JSON.parse(this.local.login);
        if (loginInfo.length === 2) {
          this.setState({username: loginInfo[0].username});
          this.setState({password: loginInfo[1].password});
          this.setState({loggedIn: true});
        }
      }
      // _____________________________________________________________________
      // for codeSandbox to work

      // if (this.local.login !== '' && this.local.length > 2) {
      //   let loginInfo = JSON.parse(this.local.login);
      //if (loginInfo.length === 2) {
      //   console.log(loginInfo);
      //   this.setState({username: loginInfo[0].username});
      //   this.setState({password: loginInfo[1].password});
      //   this.setState({loggedIn: true});
      // }
      // }
      // _____________________________________________________________________
    };

    captureInputUser = event => {
      let input = event.target.value;
      this.setState({username: input});
    };

    captureInputPass = event => {
      let input = event.target.value;
      this.setState({password: input});
    };

    setLocalLogin = info => {
      let login = JSON.stringify(info);
      this.local.setItem('login', login);
    };

    submit = event => {
      let newInfo = [];
      let username = {username: this.state.username};
      let password = {password: this.state.password};
      if (this.state.username.length > 0 && this.state.password.length > 0) {
        newInfo.push(username);
        newInfo.push(password);
      }
      this.setLocalLogin(newInfo);
    };

    render() {
      return (
        <div>
          {this.state.loggedIn === true ? (
            <Comp />
          ) : (
            <Login
              submit={this.submit}
              userChange={this.captureInputUser}
              passChange={this.captureInputPass}
            />
          )}
        </div>
      );
    }
  };
};
