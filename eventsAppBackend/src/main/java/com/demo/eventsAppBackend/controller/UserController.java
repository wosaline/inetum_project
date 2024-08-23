package com.demo.eventsAppBackend.controller;

import com.demo.eventsAppBackend.model.User;
import com.demo.eventsAppBackend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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

    //  En tant qu'utilisateur, je veux pouvoir visualiser et mettre à jour mes informations
    //personnelles dans mon profil, afin de gérer mes informations de manière sécurisée.

    // Get user by id
    @GetMapping("/users/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable int userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }

    // Update user
    @PutMapping("/users/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable int userId,
                                           @RequestBody User user) {
        User updatedUser = userService.updateUser(userId, user);
        return ResponseEntity.ok(updatedUser);
    }


    // Get all users

    @GetMapping("/users")
    @ResponseBody
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
}
