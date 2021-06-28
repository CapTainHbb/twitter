import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Login from "./Login";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      username: "",
      user_id: "",
      activeTabName: "Home"
    };
  }

  onFinishCallback = (isAuthenticated, username_param) => {
    if(isAuthenticated == true) {
      this.setState({isAuthenticated: true, username: username_param});
    }
    else {
      this.setState({isAuthenticated: false});
    }
  }

  onTabChange = (tabName) => {
    if(tabName == "Home") {
      this.setState({activeTabName: "Home"});
    }
    else if (tabName == "My Tweets") {
      this.setState({activeTabName: "My Tweets"});
    }
    
  }

  render() {
    if (this.state.isAuthenticated) {
      return (
        <div className="app">
          <Sidebar username={this.state.username} 
          onLogout={this.onFinishCallback} 
          onTabChange={this.onTabChange}
          activeTabName={this.state.activeTabName}/>
          <Feed username={this.state.username} activeTabName={this.state.activeTabName}/>
        </div>
      );
    }
    else {
      return (
        <Login onFinishCallback={this.onFinishCallback}/>
      );
    }
  }
}

export default App;
