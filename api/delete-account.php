<?php
    require('mysql.inc.php');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");

    if(isset($_POST['username'])) {
        $sql = "UPDATE user ".
            "SET password='".$_POST['password']."' ".
            "WHERE username='".$_POST['username']."'";
        $dbc->query($sql);
    }
?>