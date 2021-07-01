<?php
    session_start();
    require('mysql.inc.php');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");

    if(isset($_POST['username']) and isset($_POST['password'])) {
        
        $sql = "SELECT user_id ". 
        "FROM user WHERE username='". $_POST["username"]."' and password='".
        $_POST["password"]."'";

        $result = $dbc->query($sql);
        $row = $result->fetch_assoc();
        if($row) {
            $_SESSION["is_logged_in"] = true;
            $_SESSION["username"] = $_POST["username"];
            echo json_encode(array('success' => true));
        }
        else {
            echo json_encode(array('success' => false));
        }
    } else {
        echo json_encode(array('success' => false));
    }
?>