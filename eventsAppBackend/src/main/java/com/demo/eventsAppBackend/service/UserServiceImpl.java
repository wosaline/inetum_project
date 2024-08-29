package com.demo.eventsAppBackend.service;

import com.demo.eventsAppBackend.model.*;
import com.demo.eventsAppBackend.repository.EventRepository;
import com.demo.eventsAppBackend.repository.ParticipantRepository;
import com.demo.eventsAppBackend.repository.UserRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final ParticipantRepository participantRepository;


    public UserServiceImpl(UserRepository userRepository, EventRepository eventRepository, ParticipantRepository participantRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
        this.participantRepository = participantRepository;
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
        User user = userRepository.findById(userId);

        if (user != null) {

            List<Participant> participantEvents = participantRepository.findAllByUserIdAndStatusIn(userId, List.of(ParticipantStatus.INVITED, ParticipantStatus.ACCEPTED));

            // Convertir la liste des participants en liste d'événements
            return participantEvents.stream()
                    .map(Participant::getEvent)
                    .collect(Collectors.toList());
        } else {
            throw new EntityNotFoundException("Utilisateur non trouvé");
        }
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);

    }

    @Override
    public User updateUserRole(int userId, String roleLabel) {
        User user = userRepository.findById(userId);
        if (user == null) {
            UserRole role;
            try {
                role = UserRole.valueOf(roleLabel.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new IllegalArgumentException("Invalid role label: " + roleLabel);
            }
            user.setRole(role);
            userRepository.save(user);
            return user;
        } else {
            throw new EntityNotFoundException("Utilisateur non trouvé avec l'ID : " + userId);
        }
    }

    @Override
    public void deleteUser(int userId) {
        User user = userRepository.findById(userId);
        if (user == null) {
            throw new EntityNotFoundException("Utilisateur à supprimer non trouvé");
        }
        userRepository.delete(user);
    }
}
