import React, { forwardRef } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

class Post extends React.Component {
  constructor(props) {
    super(props);
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

  render() {
    return (
      <div className="post" >
        <div className="post__avatar">
          <Avatar />
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
            {this.props.isUserTweet? <div className="post__delete" onClick={this.deletePost}>
                                        <DeleteIcon fontSize="small"/>
                                      </div>: 
                                      <div></div>
                                      }
            
            
          </div>
        </div>
    </div>

    );
  }
}

export default Post;