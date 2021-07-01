<?php 
    session_start();
    require("mysql.inc.php");
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");

    if (isset($_SESSION["is_logged_in"])) {
        if($_SESSION["is_logged_in"]) {
            echo json_encode(array('is_logged_in' => true, "username" => $_SESSION["username"]));
        }
        else {
            echo json_encode(array('is_logged_in' => false));
        }
    }
    else {
        echo "'is_logged_in' is not set!";
    }   
    
?>