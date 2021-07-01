<?php
    session_start();
    require('mysql.inc.php');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");

    $user_id = 0;
    $tweet_id = 0;
    if(isset($_POST['username'])){
        $sql = "SELECT user_id, profile_photo FROM user WHERE username='".$_POST['username']."'";
        $result = $dbc->query($sql);
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $user_id = $row['user_id'];
            $profile_photo_name = $row['profile_photo'];



            // decrement the likes_count of tweets which user had been liked
            $sql = "SELECT tweet_id FROM likes WHERE username='".$_POST['username']."'";
            $result = $dbc->query($sql);
            while($row = $result->fetch_assoc()) {
                $tweet_id = $row["tweet_id"];
                $sql2 = "UPDATE tweet SET likes_count = likes_count - 1 WHERE tweet_id=".$tweet_id." ";
                $dbc->query($sql2);
                
            }

            $sql = "DELETE FROM likes WHERE username='".$_POST['username']."'";
            $dbc->query($sql);

            $sql = "DELETE FROM tweet WHERE user_id=".$user_id."";
            $dbc->query($sql);

            $sql = "DELETE FROM user WHERE user_id=".$user_id."";
            $dbc->query($sql);
            
            if($profile_photo_name != "default_avatar") {
                unlink("../photos/".$profile_photo_name.".jpg");
            }
           
            $_SESSION["is_logged_in"] = false;
            session_destroy();
            header('Location: /index.php');

        }
        else {
            echo "user_id can not be found!";
        }
                
        
    } else {
        echo "invalid post request";
    }
?>