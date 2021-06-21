import React from 'react';
import './Feed.css';
import TweetBox from './TweetBox';
import FeedHeader from './FeedHeader'
import Post from './Post';

class Feed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            otherTweets: "",
            userTweets: "",
            isOtherTweetsLoaded: false,
            isUserTweetsLoaded: false
        };
    }
    
    loadTweets = () => {
        var otherTweets;
        let j;
        if(this.props.activeTabName == "Home") {
            otherTweets = true;
        }
        else {
            otherTweets = false;
        }

        fetch("http://localhost:8080/api/fetch-tweets.php?username=" + 
                this.props.username + "&other_tweets=" + otherTweets)
                .then(response => response.json())
                .then(result => {
                    j = result;
                })
                .then(() => this.parseFetchTweetsResponse(j));
        
    }

    parseFetchTweetsResponse = (result) => {
            var posts = [];
            result['tweets'].forEach(tweet => {
                posts.push(
                    <Post 
                    username={tweet['username']} 
                    text={tweet['tweet']}
                    timeStamp={tweet['time_stamp']}
                    isUserTweet={this.props.activeTabName == "Home"? false: true}
                    tweetId={this.props.activeTabName == "Home"? 0: tweet['tweet_id']}
                    onDeleteTweetComplete={this.onDeleteTweetComplete}
                />
                );    
            });
                
            if(this.props.activeTabName == "Home") {
                this.setState({
                    otherTweets: <div>{posts}</div>,
                    isOtherTweetsLoaded: true
                });
            }
            else if(this.props.activeTabName == "My Tweets") {
                this.setState({
                    userTweets: <div>{posts}</div>,
                    isUserTweetsLoaded: true
                });
            } 
    }

    onCreateTweetComplete = () => {
        this.setState({
            isOtherTweetsLoaded: false,
            isUserTweetsLoaded: false
        });
    }

    onDeleteTweetComplete = () => {
        this.setState({
            isOtherTweetsLoaded: false,
            isUserTweetsLoaded: false
        });
    }

    render() {
        let body;
        if(this.props.activeTabName == "Home") {
            body = (this.state.isOtherTweetsLoaded? this.state.otherTweets: this.loadTweets());
        }
        else if(this.props.activeTabName == "My Tweets") {
            body = (this.state.isUserTweetsLoaded? this.state.userTweets: this.loadTweets());
        }

        return (
            <div className="feed">
                {/**Header */}
                <FeedHeader activeTabName={this.props.activeTabName} username={this.props.username} />
                <TweetBox username={this.props.username} onCreateTweetComplete={this.onCreateTweetComplete}/>
                {body}
                
            </div>
        );
    }

}


export default Feed
