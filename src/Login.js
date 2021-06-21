import React from 'react';
import './Login.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: "",
        isLogin: true
        }
    }
  
    myOnSubmit = (event) => {
      event.preventDefault();
      let fd = new FormData();
      fd.append("username", this.state.username);
      fd.append("password", this.state.password);
      if(event.target.name == "login") {
        fetch("http://localhost:8080/api/login.php", {
          method: 'POST',
          body: fd
        })
        .then(response => response = response.json())
        .then(result => {
            if(result["success"]) {
              this.props.onFinishCallback(true, this.state.username);
            }
            else {
              alert("username or password is wrong!");
              this.props.onFinishCallback(false, this.state.username);
            }
          }  
        );
      }
      else if(event.target.name == "signup") {
        fetch("http://localhost:8080/api/signup.php", {
          method: 'POST',
          body: fd
          })
          .then(response => response = response.json())
          .then(result => {
            if(result["success"]){
              this.props.onFinishCallback(true, this.state.username);
            }
            else {
              alert("can't signup!");
              this.props.onFinishCallback(false);
            }
          });
          
          
        }      
    }
  
    myOnChangeHandler = (event) => {
      let eveName = event.target.name;
      let eveValue = event.target.value;
      this.setState({[eveName]: eveValue});
    }

    changeTab = () => {
        this.setState({isLogin: !this.state.isLogin});
    }

    render () {
        let header = '';
        let body = '';

        if(this.state.isLogin) {
            header = <h2>Login to your account</h2>;
            body = (
                <form name="login" onSubmit={this.myOnSubmit}>
                    <input type="text" name="username" placeholder="username" onChange={this.myOnChangeHandler} />
                    <input type="password" name="password" placeholder="password" onChange={this.myOnChangeHandler} />
                    <div className="login-page-footer">
                        <input type="submit" value="Login" />
                        <a onClick={(this.changeTab)}>SignUp</a>
                    </div>
                </form>
            );
        }
        else {
            header = <h2>sign up!</h2>;
            body = (
                <form name="signup" onSubmit={this.myOnSubmit}>
                    <input type="text" name="username" placeholder="username" onChange={this.myOnChangeHandler} />
                    <input type="password" name="password" placeholder="password" onChange={this.myOnChangeHandler} />
                    <div className="login-page-footer">
                        <input type="submit" value="SignUp"/>
                        <a onClick={(this.changeTab)}>Login</a>
                    </div>
                </form>
            );
        }
        
      return (
        <div className="login-page">
          {header}
          {body}
        </div>
      )
    }
}

export default Login;
