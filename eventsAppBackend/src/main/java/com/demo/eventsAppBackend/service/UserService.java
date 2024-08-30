package com.demo.eventsAppBackend.service;

import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.Participant;
import com.demo.eventsAppBackend.model.User;

import java.util.List;

public interface UserService {
    boolean isEmailUnique(String email);
    User addUser(User user);
    User getUserById(int userId);
    User updateUser(int userId, User user);
    List<User> getAllUsers();
    List<Event> getAllEventsByUserId(int userId);
    User getUserByEmail(String email);
    User updateUserRole(int userId, String role);
    void deleteUser(int userId);
}
