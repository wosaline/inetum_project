package com.demo.eventsAppBackend.service;

import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.User;
import com.demo.eventsAppBackend.repository.EventRepository;
import com.demo.eventsAppBackend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EventRepository eventRepository;

    public UserServiceImpl(UserRepository userRepository, EventRepository eventRepository,  PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.eventRepository = eventRepository;
    }

    @Override
    public User addUser(User user) {
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        System.out.println(user.getPasswordHash());
        return userRepository.save(user);
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

//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        User user = userRepository.findByUsername(username);
//        if (user == null) {
//            throw new UsernameNotFoundException("Utilisateur non trouvé");
//        }
//        org.springframework.security.core.userdetails.User.UserBuilder builder = org.springframework.security.core.userdetails.User.withUsername(username);
//        builder.password(user.getPasswordHash());
//        builder.roles(user.getRole().name());
//        return builder.build();
//    }
    @Override
    public List<Event> getAllEventsByUserId(int userId) {
        if (userRepository.findById(userId) != null) {
            return eventRepository.findAllByCreatedById(userId);
        } else {
            throw new EntityNotFoundException("Utilisateur non trouvé");
        }
    }

}
