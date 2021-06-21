import React from 'react';
import './TweetBox.css';
import {Avatar, Button } from '@material-ui/core';

class TweetBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tweet: ""
        }
    }
    
    postTweet = () => {
        var fd = new FormData();
        fd.append("username", this.props.username);
        fd.append("tweet", this.state.tweet);
        
        fetch("http://localhost:8080/api/post-tweet.php", {
            method: 'POST',
            body: fd
            })
        .then( data => {
            this.props.onCreateTweetComplete();
        }
        );
    }

    onChangeHandler = (event) => {
        this.setState({
            tweet: event.target.value
        });
    }


    render() {
        return (
            <div className="tweetBox">
                <form>
                    <div className="tweetBox__input">
                        <Avatar />
                        <input placeholder="What's hapenning?" type="text" onChange={this.onChangeHandler}></input>
                    </div>
                    <div className="tweetBox__buttons">
                        <Button className="tweetBox__tweetButton" onClick={this.props.onCreateTweetComplete}>Refresh</Button>
                        <Button className="tweetBox__tweetButton" onClick={this.postTweet}>Tweet!</Button>
                    </div>
                    
                </form>
            </div>
        );
    }
    
}

export default TweetBox
