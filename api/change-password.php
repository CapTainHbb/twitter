<?php
    session_start();
    require('mysql.inc.php');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");

    if(isset($_POST['username']) and isset($_POST['password'])) {
        $sql = "UPDATE user ".
            "SET password='".$_POST['password']."' ".
            "WHERE username='".$_POST['username']."'";
        $dbc->query($sql);
        
        $_SESSION["is_logged_in"] = false;
        header('Location: /index.php');
    }
    else {
        echo "invalid post request!";
    }
?>