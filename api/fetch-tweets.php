<?php
    require('mysql.inc.php');
    
    if(isset($_GET["username"]) and isset($_GET["other_tweets"])) {
        $tweets = array();
        $sql = "";
        
        if($_GET["other_tweets"] == "false") {
            $sql = "SELECT username, body, time_stamp, tweet_id ". 
                " FROM tweet INNER JOIN user ON ".
                " tweet.user_id = user.user_id ".
                " WHERE username='". $_GET["username"] ."' ".
                " ORDER BY time_stamp DESC LIMIT 25";
        }
        else {
            $sql = "SELECT username, body, time_stamp, tweet_id ". 
                "FROM tweet INNER JOIN user ON ".
                "tweet.user_id = user.user_id ORDER BY time_stamp DESC LIMIT 25 ";
        }
        
        $result = $dbc->query($sql);
        if ($result->num_rows > 0) {
            // output data of each row
            while($row = $result->fetch_assoc()) {
                if ($_GET["other_tweets"] == "false") {
                    array_push($tweets, array('username'=>$row['username'], 
                    'tweet'=>$row['body'], 
                    'time_stamp'=>$row['time_stamp'],
                    'tweet_id'=>$row['tweet_id']
                ));
                }
                else {
                    array_push($tweets, array('username'=>$row['username'], 'tweet'=>$row['body'], 'time_stamp'=>$row['time_stamp']));
                }
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