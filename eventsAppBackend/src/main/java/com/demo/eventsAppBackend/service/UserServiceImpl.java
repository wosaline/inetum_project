package com.demo.eventsAppBackend.service;

import com.demo.eventsAppBackend.model.User;
import com.demo.eventsAppBackend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User addUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User getUserById(int userId) {
        return userRepository.findById(userId);
    }

    @Override
    public User updateUser(int userId, User user) {
        User userToUpdate = userRepository.findById(userId);
        if (userToUpdate != null) {
            user.setUserId(userId);
            user.setCreatedAt(userToUpdate.getCreatedAt());
            return userRepository.save(user);
        }else{
            throw new EntityNotFoundException("Utilisateur à mettre à jour non trouvé");
        }
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

}
