<?php
    require('mysql.inc.php');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    
    if(isset($_POST["upload"])){
        $temp_name = $_FILES['uploadfile']['tmp_name'];
        $file_name = $_POST['username'];
        $folder = "../photos/".$file_name.".jpg";

        if(move_uploaded_file($temp_name, $folder)) {
            $sql = "UPDATE user ".
            "SET profile_photo='".$_POST['username']."' ".
            "WHERE username='".$_POST['username']."'";
            $dbc->query($sql);
            header('Location: /index.php');
        }   
        else {
            echo "Failed to upload image";
        }
    }
    
?>