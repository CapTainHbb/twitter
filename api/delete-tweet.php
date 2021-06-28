<?php
    require('mysql.inc.php');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");

    if(isset($_POST['tweet_id'])){
        if(is_numeric($_POST['tweet_id'])){
            $query = mysqli_query($dbc, "DELETE FROM tweet WHERE tweet_id=".mysql_safe($_POST['tweet_id']));
            
            $query = mysqli_query($dbc, "DELETE FROM likes WHERE tweet_id=".mysql_safe($_POST['tweet_id']));

            if(mysqli_affected_rows($dbc) > 0)
                echo json_encode(array('success' => true));
            else
                echo json_encode(array('success' => false));
                
        } else {
            echo json_encode(array('success' => false));
        }
    } else {
        echo json_encode(array('success' => false));
    }
?>