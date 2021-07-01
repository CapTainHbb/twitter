import React, { forwardRef } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

class Post extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      likesCount: props.likesCount,
      isLikedByYou: props.isLikedByYou
    }
    
  }

  deletePost = () => {
    var fd = new FormData();
    fd.append("tweet_id", this.props.tweetId);

    fetch("http://localhost:8080/api/delete-tweet.php", {
            method: 'POST',
            body: fd
            })
          .then( data => {
            this.props.onDeleteTweetComplete();
            }
          );
  }

  incrementLike = () => {
    var fd = new FormData();
    let j;
    fd.append("tweet_id", this.props.tweetId);
    fd.append("increment", 1);
    fd.append("username", this.props.username);

    fetch("http://localhost:8080/api/likes.php", {
            method: 'POST',
            body: fd
            })
          .then(response => response.json())
          .then(result => j = result)
          .then( () => 
            this.onLikeComplete(j)
          );
  }
  
  decrementLike = () => {
    var fd = new FormData();
    let j;
    fd.append("tweet_id", this.props.tweetId);
    fd.append("increment", 0);
    fd.append("username", this.props.username);

    fetch("http://localhost:8080/api/likes.php", {
            method: 'POST',
            body: fd
            })
          .then(response => response.json())
          .then(result => j = result)
          .then( () => 
            this.onLikeComplete(j)
          );
  }

  onLikeComplete = (result) => {
    if(result["success"]) {
      this.setState({
        isLikedByYou: result['is_liked_by_you'],
        likesCount: result['likes_count']
      })
    }
    else {
      alert('cant complete like operation!');
    }
  }

  imageExists = (image_url) => {

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();
    return http.status != 404;
  }

  render() {
    var imageUrl = "http://localhost:8080/photos/" + this.props.username + ".jpg";
    return (
      <div className="post" >
        <div className="post__avatar">
          {this.imageExists(imageUrl)? <img src={imageUrl} className="avatar_post"/>
          :<img src={"http://localhost:8080/photos/default_avatar.jpg"} className="avatar_post"/> }
          
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                <span className="post__headerSpecial">@
                  {this.props.username}
                </span>
              </h3>
            </div>
            <div className="post__headerDescription">
              <p>{this.props.text}</p>
            </div>
          </div>
          <div className="post__footer">
            <div>
              <AccessTimeIcon fontSize="small" />
              <span>{this.props.timeStamp}</span>
            </div>
            <div>
              
            </div>
            {this.props.isUserTweet? <div className="post__delete" onClick={this.deletePost}>
                                        <DeleteIcon fontSize="small"/>
                                      </div>:
                                      <div></div>
                                      }
            {this.state.isLikedByYou? <div className="post__delete" onClick={this.decrementLike}><FavoriteIcon />{this.state.likesCount}</div>:
            <div className="post__delete" onClick={this.incrementLike}><FavoriteBorderIcon />{this.state.likesCount}</div>}
            
            
          </div>
        </div>
    </div>

    );
  }
}

export default Post;