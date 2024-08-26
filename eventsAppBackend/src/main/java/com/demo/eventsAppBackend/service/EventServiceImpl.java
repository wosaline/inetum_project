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

import java.time.LocalDate;
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

        // create participant : save the event's creator as participant
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
            throw new EntityNotFoundException("Participant not found");
        }

        ParticipantStatus currentStatus = participant.getStatus();
        if (currentStatus == ParticipantStatus.CANCELED) {
            throw new IllegalStateException("The status has already been canceled and cannot be changed.");
        }

        ParticipantStatus newStatus = null;

        boolean isCreator = participant.getEvent().getCreatedBy().getId() == userId;
        boolean isParticipant = participant.getUser().getId() == userId;

        if (isParticipant) {
            if (currentStatus == ParticipantStatus.INVITED) {
                if (response.equalsIgnoreCase("accept")) {
                    newStatus = ParticipantStatus.ACCEPTED;
                } else if (response.equalsIgnoreCase("decline")) {
                    newStatus = ParticipantStatus.DECLINED;
                } else {
                    throw new IllegalStateException("Invalid response. You can only accept or decline the invitation.");
                }
            } else {
                throw new IllegalStateException("You cannot update the status once it has been changed from INVITED.");
            }
        } else if (isCreator) {
            if (response.equalsIgnoreCase("cancel")) {
                newStatus = ParticipantStatus.CANCELED;
            } else {
                throw new IllegalStateException("The creator can only update the status to CANCELED.");
            }
        } else {
            throw new SecurityException("Unauthorized action.");
        }

        participant.setStatus(newStatus);
        return participantRepository.save(participant);
    }

    @Override
    public List<Event> getAllEventsByDate(LocalDate date) { // format : YYYY-MM-DD
        return eventRepository.findAllByDate(date);
    }

    public List<Event> getAllEventsByMonth(int year, int month) {
        return eventRepository.findAllByYearAndMonth(year, month);
    }

    @Override
    public List<LocalDate> getDatesWithEvents(int year, int month) {
        return eventRepository.findDatesWithEvents(year, month);
    }
}
