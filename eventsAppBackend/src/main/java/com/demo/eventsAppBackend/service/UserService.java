package com.demo.eventsAppBackend.service;

import com.demo.eventsAppBackend.model.User;

import java.util.List;

public interface UserService {

    User addUser(User user);
    User getUserById(int userId);
    User updateUser(User user);

    List<User> getAllUsers();
}
