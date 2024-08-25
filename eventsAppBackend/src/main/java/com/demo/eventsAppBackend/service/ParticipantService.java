package com.demo.eventsAppBackend.service;

import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.Participant;
import com.demo.eventsAppBackend.model.User;

public interface ParticipantService {
    Participant findParticipantByUserIdAndEventId(int userId, int eventId);
}
