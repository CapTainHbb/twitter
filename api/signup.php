<?php
    require('mysql.inc.php');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");

    if(isset($_POST['username']) and isset($_POST['password'])) {
        
        $sql = "INSERT INTO user(username, password) VALUES ('".
        $_POST['username']."', '".$_POST['password']."')";

        $query = mysqli_query($dbc, $sql);
        
        if(mysqli_affected_rows($dbc) > 0)
            echo json_encode(array('success' => true));
        else
            echo json_encode(array('success' => false));
    } else {
        echo json_encode(array('success' => false));
    }
?>