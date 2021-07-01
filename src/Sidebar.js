import React from "react";
import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from "@material-ui/icons/Home";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import './Sidebar.css';
import SidebarOption from './SidebarOption';
import { Button } from "@material-ui/core";

class Sidebar extends React.Component{
    constructor(props) {
        super(props);
    }
    
    logoutHandler = () => {
        this.props.onLogout(false, "");
    }

    tabChangeHandler = (tabName) => {
        this.setState({activeTabName: tabName});
        this.props.onTabChange(tabName);
    }

    render() {
        return (
            
            <div className="sidebar">
                {/* Twitter icon */}
                <TwitterIcon className="sidebar_twitter_icon" />

                <SidebarOption activeTabName={this.props.activeTabName} Icon={HomeIcon} text="Home" onClick={this.tabChangeHandler}/>
                {/* <SidebarOption activeTabName={this.props.activeTabName} Icon={PeopleOutlineIcon} text="Followers And Followings" onClick={this.tabChangeHandler} /> */}
                <SidebarOption activeTabName={this.props.activeTabName} Icon={TwitterIcon} text="My Tweets" onClick={this.tabChangeHandler} />
                <SidebarOption activeTabName={this.props.activeTabName} Icon={PeopleOutlineIcon} text="Profile" onClick={this.tabChangeHandler} />

                <Button variant="outlined" 
                className="sidebar__tweet" 
                onClick={this.logoutHandler}
                 fullWidth> 
                    Log out
                </Button>
            </div>
        );
    }

}

export default Sidebar;