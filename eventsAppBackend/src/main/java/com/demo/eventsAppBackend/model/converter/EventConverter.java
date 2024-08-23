package com.demo.eventsAppBackend.model.converter;

import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.User;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class EventConverter {
    public static Event convertToEvent(String description,
                                       LocalDate date,
                                       LocalTime time,
                                       int capacity,
                                       boolean isPrivate,
                                       User createdBy,
                                       LocalDateTime createdAt,
                                       LocalDateTime updatedAt,
                                       String title,
                                       String location,
                                       String logo) {
        Event event = new Event();

        event.setDescription(description);
        event.setDate(date);
        event.setTime(time);
        event.setCapacity(capacity);
        event.setPrivate(isPrivate);
        event.setUser(createdBy);
        event.setCreatedAt(createdAt);
        event.setUpdatedAt(updatedAt);
        event.setTitle(title);
        event.setLocation(location);
        event.setLogo(logo);

        return event;
    }
}
