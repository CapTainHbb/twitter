<?php
    require('mysql.inc.php');

    // sql to create table
    $sql = "CREATE TABLE user (
    user_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    password VARCHAR(30) NOT NULL,
    profile_photo VARCHAR(30) default 'default_avatar'
    )";

    if ($dbc->query($sql) === TRUE) {
    echo "Table users created successfully\n";
    } else {
    echo "Error creating table: " . $dbc->error;
    }

    // sql to create table
    $sql = "CREATE TABLE tweet (
        tweet_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        user_id INT(6) NOT NULL,
        body TEXT,
        time_stamp timestamp default CURRENT_TIMESTAMP,
        likes_count INT(6) default 0
        )";
    
    if ($dbc->query($sql) === TRUE) {
        echo "Table tweet created successfully\n";
    } else {
        echo "Error creating table: " . $dbc->error;
    }

    // sql to create table
    $sql = "CREATE TABLE likes (
        username VARCHAR(30) NOT NULL,
        tweet_id int(6) NOT NULL
        )";
    
    if ($dbc->query($sql) === TRUE) {
        echo "Table likes created successfully\n";
    } else {
        echo "Error creating table: " . $dbc->error;
    }

?> 