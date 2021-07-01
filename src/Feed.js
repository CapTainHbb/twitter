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
                    username_of_tweet={tweet['username']}
                    username={this.props.username} 
                    text={tweet['tweet']}
                    timeStamp={tweet['time_stamp']}
                    isUserTweet={this.props.activeTabName == "Home"? false: true}
                    tweetId={tweet['tweet_id']}
                    onDeleteTweetComplete={this.onDeleteTweetComplete}
                    isLikedByYou={tweet['is_liked_by_you']}
                    likesCount={tweet['likes_count']}
                    
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

    imageExists = (image_url) => {

        var http = new XMLHttpRequest();
    
        http.open('HEAD', image_url, false);
        http.send();
        return http.status != 404;
      }

    render() {
        let body;
        var imageUrl;
        if(this.props.activeTabName == "Home") {
            body = (this.state.isOtherTweetsLoaded? this.state.otherTweets: this.loadTweets());
        }
        else if(this.props.activeTabName == "My Tweets") {
            body = (this.state.isUserTweetsLoaded? this.state.userTweets: this.loadTweets());
        }
        else if(this.props.activeTabName == "Profile") {
            imageUrl="http://localhost:8080/photos/" + this.props.username + ".jpg";
            body = (
                <div>
                    <form action="http://localhost:8080/api/upload-photo.php" className="change_profile" method="post" enctype="multipart/form-data">

                        {this.imageExists(imageUrl)?  <img src={imageUrl} className="avatar_profile"></img>:
                        <img src="http://localhost:8080/photos/default_avatar.jpg" className="avatar_profile"></img>
                        }
                       

                        <div class="upload-btn-wrapper">
                            <button className="btn">Upload a file</button>
                            <input type="hidden" name="username" value={this.props.username}></input>
                            <input type="file" name="uploadfile" />
                        </div>

                        <input type="submit" name="upload" className="sidebar__tweet" value="submit photo"></input>

                    </form >
                        
                    <form action="http://localhost:8080/api/change-password.php" className="change_password" method="post">
                        <input type="password" name="password" className="btn" placeholder="New passwrord ..."></input>
                        <input type="hidden" name="username" value={this.props.username}></input>
                        <input type="submit" name="chnage_password" className="sidebar__tweet" value="change password"></input>
                    </form>

                    <form action="http://localhost:8080/api/delete-account.php" className="delete_acc" method="post">
                        <input type="hidden" name="username" value={this.props.username}></input>
                        <input type="submit" value="delete account" name="delete_account" className="sidebar__tweet"></input>
                    </form>


                </div>



            );
        }

        return (
            <div className="feed">
                {/**Header */}
                <FeedHeader activeTabName={this.props.activeTabName} username={this.props.username} />
                {this.props.activeTabName != "Profile" ?  <TweetBox username={this.props.username} onCreateTweetComplete={this.onCreateTweetComplete}/> 
                : ""               }
               
                {body}
                
            </div>
        );
    }

}


export default Feed
