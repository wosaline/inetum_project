package com.demo.eventsAppBackend.service;


import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.Participant;
import com.demo.eventsAppBackend.model.ParticipantStatus;
import com.demo.eventsAppBackend.model.User;
import com.demo.eventsAppBackend.repository.ParticipantRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ParticipantServiceImpl implements ParticipantService{
    private final ParticipantRepository participantRepository;

    public ParticipantServiceImpl(ParticipantRepository participantRepository) {
        this.participantRepository = participantRepository;
    }

    @Override
    public Participant findParticipantByUserIdAndEventId(int userId, int eventId) {
        Participant participant = participantRepository.findFirstByUserIdAndEventId(userId, eventId);

        if (participant == null) {
            throw new EntityNotFoundException("Participant not found");
        }

        if (participant.getStatus() != ParticipantStatus.ACCEPTED) {
            throw new SecurityException("User is not accepted for this event");
        }

        return participant;
    }
}
