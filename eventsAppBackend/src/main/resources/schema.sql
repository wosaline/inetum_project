DROP DATABASE IF EXISTS events_db;

CREATE DATABASE IF NOT EXISTS events_db;

USE events_db;

-- Create the users table
CREATE TABLE user (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role ENUM('USER', 'ADMIN') NOT NULL
);

-- Create the events table
CREATE TABLE event (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    description TEXT NOT NULL,
    date DATE NOT NULL,  -- format = YYYY-MM-DD
    time TIME NOT NULL,  -- format = HH:MM:SS
    logo VARCHAR(255) NULL,  -- Chemin ou URL du logo qui peut être null
    capacity INT,
    is_private BOOLEAN NOT NULL,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    title VARCHAR(100),
    location VARCHAR(255),
    FOREIGN KEY (created_by) REFERENCES user(user_id)
);

-- Create the participants table
CREATE TABLE participant (
    participant_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    invited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    responded_at TIMESTAMP DEFAULT NULL,  -- peut être NULL si non répondu
    status ENUM('INVITED', 'ACCEPTED', 'DECLINED', 'CANCELED') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (event_id) REFERENCES event(event_id)
);

-- Create the notifications table
CREATE TABLE notification (
    notification_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    type ENUM('INVITATION', 'REMINDER', 'UPDATE') NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (event_id) REFERENCES event(event_id)
);

-- Create the comments table
CREATE TABLE comment (
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    rating INT CHECK (rating BETWEEN 1 AND 5),  -- Note entre 1 et 5
    FOREIGN KEY (user_id) REFERENCES user(user_id),
    FOREIGN KEY (event_id) REFERENCES event(event_id)
);


-- drop database events_db_test;
-- create database if not exists events_db_test;