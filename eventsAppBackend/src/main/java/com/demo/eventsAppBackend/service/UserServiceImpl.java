package com.demo.eventsAppBackend.service;

import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.Participant;
import com.demo.eventsAppBackend.model.ParticipantStatus;
import com.demo.eventsAppBackend.model.User;
import com.demo.eventsAppBackend.repository.EventRepository;
import com.demo.eventsAppBackend.repository.ParticipantRepository;
import com.demo.eventsAppBackend.repository.UserRepository;
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
    public User addUser(User user) {
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

}
