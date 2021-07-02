import React from 'react';
import './FeedHeader.css';  

class FeedHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let text = '';
        if(this.props.activeTabName == "Home") {
            text = <h2>Home <br/> welcome {this.props.username}!</h2>;
        }
        else if(this.props.activeTabName == "Followers And Followings") {
            text = <h2>{this.props.activeTabName}!</h2>;
        }
        else if(this.props.activeTabName == "My Tweets") {
            text = <h2>{this.props.activeTabName}!</h2>;
        }
        else if(this.props.activeTabName == "Profile") {
            text = <h2>{this.props.activeTabName}</h2>
        }

        return (
        <div className="feed_header">
            {text}
        </div>
        );
    }
}

export default FeedHeader
