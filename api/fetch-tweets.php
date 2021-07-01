<?php
    require('mysql.inc.php');
    
    if(isset($_GET["username"]) and isset($_GET["other_tweets"])) {
        $tweets = array();
        $sql = "";
        $is_liked_by_you = 0;
        
        if($_GET["other_tweets"] == "false") {
            $sql = "SELECT username, body, time_stamp, tweet_id, likes_count, profile_photo ". 
                " FROM tweet INNER JOIN user ON ".
                " tweet.user_id = user.user_id ".
                " WHERE username='". $_GET["username"] ."' ".
                " ORDER BY time_stamp DESC";
        }
        else {
            $sql = "SELECT username, body, time_stamp, tweet_id, likes_count, profile_photo ". 
                "FROM tweet INNER JOIN user ON ".
                "tweet.user_id = user.user_id ORDER BY time_stamp DESC";
        }
        
        $result = $dbc->query($sql);
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                // checking if this tweet is liked by user or not
                $sql = "SELECT * FROM likes WHERE username='".$_GET['username']."' ".
                "AND tweet_id=".$row['tweet_id']." ";
                $result2 = $dbc->query($sql);
                $row2 = $result2->fetch_assoc();
                if($row2) {
                    $is_liked_by_you = true;
                }
                else {
                    $is_liked_by_you = false;
                }
                //
                array_push($tweets, array('username'=>$row['username'], 
                    'tweet'=>$row['body'], 
                    'time_stamp'=>$row['time_stamp'],
                    'tweet_id'=>$row['tweet_id'],
                    'is_liked_by_you'=>$is_liked_by_you,
                    'likes_count'=>$row['likes_count'],
                    'profile_photo'=>$row['profile_photo']
                    ));
                }
                echo json_encode(array('success' => true, 'tweets' => $tweets));
            }            
        else {
            echo json_encode(array('success' => true, 'tweets' => []));
        }
    }
    else {
        echo json_encode(array('success' => false, 'tweets' => []));
    }
    
?>