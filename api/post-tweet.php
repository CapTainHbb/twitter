<?php
    require('mysql.inc.php');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    
    if(isset($_POST["username"]) and isset($_POST["tweet"])) {

        $sql = "SELECT user_id ". 
                "FROM user WHERE username='". $_POST["username"]."'";
        $result = $dbc->query($sql);
        $row = $result->fetch_assoc();

        $sql = "INSERT INTO tweet(user_id, body) VALUES ". 
                "(".$row["user_id"].", '".$_POST["tweet"]."')";

        $dbc->query($sql);
        echo json_encode(array('success' => true));
        
    }
    else {
        echo json_encode(array('success' => false, 'tweets' => []));
    }
    
?>