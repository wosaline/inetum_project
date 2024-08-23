package com.demo.eventsAppBackend.controller;

import com.demo.eventsAppBackend.model.User;
import com.demo.eventsAppBackend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public class UserController {

    private final UserService userService;

    private UserController(UserService userService) {
        this.userService = userService;
    }

    // En tant qu'utilisateur, je veux pouvoir m'inscrire sur la plateforme en créant un compte
    //avec mon email et un mot de passe, afin d'accéder aux fonctionnalités de l'application.

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.addUser(user);
        return ResponseEntity.ok(createdUser);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable int userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    // En tant qu'utilisateur, je veux pouvoir avoir accès à tous les utilisateurs ?

    @GetMapping("/users")
    @ResponseBody
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}
