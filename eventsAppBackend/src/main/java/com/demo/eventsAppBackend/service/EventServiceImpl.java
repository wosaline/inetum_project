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

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final ParticipantRepository participantRepository;

    public EventServiceImpl(EventRepository eventRepository, UserRepository userRepository, ParticipantRepository participantRepository) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.participantRepository = participantRepository;
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public Event getEventById(int eventId) {
        Event event = eventRepository.findById(eventId);
        if (event == null) {
            throw new EntityNotFoundException("Evénement non trouvé");
        }
        return event;
    }

    @Override
    public Event addEvent(Event event) {
        User user = userRepository.findById(event.getCreatedBy().getId());
        if (user == null) {
            throw new EntityNotFoundException("Créateur de l'événement non trouvé");
        }
        event.setCreatedBy(user);
        Event savedEvent = eventRepository.save(event);

        // create participant : save the event's organiser as participant
        Participant participant = new Participant();
        participant.setUser(user);
        participant.setEvent(savedEvent);
        participant.setStatus(ParticipantStatus.ACCEPTED);
        participant.setRespondedAt(LocalDateTime.now());

        participantRepository.save(participant);

        return savedEvent;
    }

    @Override
    public Event updateEvent(int eventId, Event event) {
        User user = userRepository.findById(event.getCreatedBy().getId());
        Event eventToUpdate = eventRepository.findById(eventId);

        if (user == null || eventToUpdate == null) {
            throw new EntityNotFoundException("Créateur de l'événement et/ou événement non trouvé");
        }
        event.setId(eventId);
        event.setCreatedBy(user);
        event.setCreatedAt(eventToUpdate.getCreatedAt());
        return eventRepository.save(event);
    }

    @Override
    public void deleteEvent(int eventId) {
        Event event = eventRepository.findById(eventId);
        if (event == null) {
            throw new EntityNotFoundException("Evénement à supprimer non trouvé");
        }
        eventRepository.delete(event);
    }

    @Override
    public Participant inviteUsersToEvent(int eventId, int userId, int creatorId) {
        Event event = eventRepository.findById(eventId);
        if (event == null) {
            throw new EntityNotFoundException("Événement non trouvé");
        }

        if (event.getCreatedBy().getId() != creatorId) {
            throw new SecurityException("Seul le créateur de l'événement peut inviter des utilisateurs");
        }

        User user = userRepository.findById(userId);
        if (user == null) {
            throw new EntityNotFoundException("Utilisateur avec ID " + userId + " non trouvé");
        }

        Participant participant = new Participant();
        participant.setUser(user);
        participant.setEvent(event);
        participant.setStatus(ParticipantStatus.INVITED);

        return participantRepository.save(participant);
    }

    @Override
    public Participant updateParticipant(int participantId, int eventId, int userId, String response) {

        Participant participant = participantRepository.findById(participantId);

        if (participant == null) {
            throw new EntityNotFoundException("Participant found");
        }

        if (participant.getUser().getId() != userId) {
            throw new SecurityException("Only the invited user can update the invite");
        }

        if (participant.getEvent().getId() != eventId) {
            throw new SecurityException("Mismatched event and participant");
        }

        ParticipantStatus currentStatus = participant.getStatus();
        ParticipantStatus newStatus;

        switch (currentStatus) {
            case INVITED:
                if (response.equalsIgnoreCase("accept")) {
                    newStatus = ParticipantStatus.ACCEPTED;
                } else if (response.equalsIgnoreCase("decline")) {
                    newStatus = ParticipantStatus.DECLINED;
                } else {
                    throw new IllegalStateException("Invalid response. When invited, you can only accept or decline.");
                }
                break;

            case ACCEPTED:
                if (response.equalsIgnoreCase("cancel")) {
                    newStatus = ParticipantStatus.CANCELED;
                } else {
                    throw new IllegalStateException("Invalid response. When accepted, you can only cancel.");
                }
                break;

            default:
                throw new IllegalStateException("Cannot change status from " + currentStatus);
        }

        participant.setStatus(newStatus);
//        participant.setRespondedAt(LocalDateTime.now());
        return participantRepository.save(participant);
    }
}
