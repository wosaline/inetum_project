package com.demo.eventsAppBackend.service;

import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.User;
import com.demo.eventsAppBackend.repository.EventRepository;
import com.demo.eventsAppBackend.repository.UserRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public UserServiceImpl(UserRepository userRepository, EventRepository eventRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    @Override
    public boolean isEmailUnique(String email) {
        User user = userRepository.findByEmail(email);
        return user == null;
    }

    @Override
    public User addUser(User user) {
        if(isEmailUnique(user.getEmail()))
            return userRepository.save(user);
        throw new EntityExistsException("Utilisateur existe déjà pour cette adresse mail");
    }

    @Override
    public User getUserById(int userId) {
        User user = userRepository.findById(userId);
        if (user != null) {
            return user;
        } else {
            throw new EntityNotFoundException("Utilisateur non trouvé");
        }
    }

    @Override
    public User updateUser(int userId, User user) {
        User userToUpdate = userRepository.findById(userId);
        if (userToUpdate != null) {
            if(!userToUpdate.getEmail().equals(user.getEmail()) && !isEmailUnique(user.getEmail())){
                throw new EntityExistsException("Utilisateur existe déjà pour cette adresse mail");
            }
            user.setId(userId);
            user.setCreatedAt(userToUpdate.getCreatedAt());
            return userRepository.save(user);
        } else {
            throw new EntityNotFoundException("Utilisateur à mettre à jour non trouvé");
        }
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<Event> getAllEventsByUserId(int userId) {
        if (userRepository.findById(userId) != null) {
            return eventRepository.findAllByCreatedById(userId);
        } else {
            throw new EntityNotFoundException("Utilisateur non trouvé");
        }
    }

}
