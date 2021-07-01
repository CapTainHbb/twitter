<?php
    require('mysql.inc.php');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");

    $is_liked_by_you = 0;

    if (isset($_POST['username']) and isset($_POST['tweet_id']) and isset($_POST['increment'])) {
        if($_POST['increment'] == 1) {
            $sql = "UPDATE tweet SET likes_count = likes_count + 1 WHERE tweet_id=".
            $_POST['tweet_id']." ";
            $result = $dbc->query($sql);
    
            $sql = "INSERT  INTO likes(username, tweet_id) VALUES ". 
                    "('".$_POST["username"]."', ".$_POST["tweet_id"].")";
            $dbc->query($sql);

            $sql = "SELECT * FROM likes WHERE username='".$_POST['username']."' ".
                    "AND tweet_id=".$_POST['tweet_id']." ";
            
            $result = $dbc->query($sql);
            $row = $result->fetch_assoc();
            if($row) {
                $is_liked_by_you = true;
            }
            else {
                $is_liked_by_you = false;
            }
    
            $sql = "SELECT likes_count FROM tweet WHERE tweet_id=".
            $_POST['tweet_id']." ";
            $result = $dbc->query($sql);
            $row = $result->fetch_assoc();
    
            echo json_encode(array('success' => true,
            'is_liked_by_you' => $is_liked_by_you,
            'likes_count' => $row['likes_count']
            ));
        }
        else {
            $sql = "UPDATE tweet SET likes_count = likes_count - 1 WHERE tweet_id=".
            $_POST['tweet_id']." ";
            $result = $dbc->query($sql);
    
            $sql = "DELETE FROM likes WHERE username='".$_POST['username']."' "; 
            $dbc->query($sql);
    
            $sql = "SELECT * FROM likes WHERE username='".$_POST['username']."' ".
                    "AND tweet_id=".$_POST['tweet_id']." ";
            $result = $dbc->query($sql);
            $row = $result->fetch_assoc();
            if($row) {
                $is_liked_by_you = true;
            }
            else {
                $is_liked_by_you = false;
            }
    
            $sql = "SELECT likes_count FROM tweet WHERE tweet_id=".
            $_POST['tweet_id']." ";
            $result = $dbc->query($sql);
            $row = $result->fetch_assoc();
    
            echo json_encode(array('success' => true,
            'is_liked_by_you' => $is_liked_by_you,
            'likes_count' => $row['likes_count']
            ));
        }
       
    }
    else {
        echo 'request parameter error!';
    }
?>