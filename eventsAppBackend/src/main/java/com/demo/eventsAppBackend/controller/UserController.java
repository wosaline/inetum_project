package com.demo.eventsAppBackend.controller;

import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.User;
import com.demo.eventsAppBackend.service.UserService;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserService userService;

    private UserController(UserService userService) {
        this.userService = userService;
    }

    // create user
    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            return ResponseEntity.ok(userService.addUser(user));
        } catch (EntityExistsException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Get user
    @GetMapping("/users/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable int userId) {
        try {
            return ResponseEntity.ok(userService.getUserById(userId));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Update user
    @PutMapping("/users/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable int userId,
                                           @RequestBody User user) {
        try {
            return ResponseEntity.ok(userService.updateUser(userId, user));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (EntityExistsException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Get all users
    @GetMapping("/users")
    @ResponseBody
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // Get all events by userID
    @GetMapping("/users/{userId}/events")
    @ResponseBody
    public ResponseEntity<List<Event>> getAllEventsByUserId(@PathVariable int userId) {
        try {
            return ResponseEntity.ok(userService.getAllEventsByUserId(userId));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // authenticate user
    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestParam String email, @RequestParam String password) {
        User user = userService.getUserByEmail(email);

        if (user == null || !user.getPasswordHash().equals(password)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Bad credentials");
        }

        return ResponseEntity.ok(user);
    }

    // Update User Role
    @PutMapping("/users/{userId}/role")
    public ResponseEntity<User> updateUserRole(@PathVariable int userId,
                                               @RequestParam("role") String roleLabel) {
        try {
            return ResponseEntity.ok(userService.updateUserRole(userId, roleLabel));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (EntityExistsException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Delete User
    @DeleteMapping("/users/{userId}")
    @ResponseBody
    public ResponseEntity deleteUser(@PathVariable int userId) {
        try {
            userService.deleteUser(userId);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
