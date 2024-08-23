package com.demo.eventsAppBackend.model.converter;

import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.User;

import java.time.LocalDate;
import java.time.LocalTime;

public class EventConverter {
    public static Event convertToEvent(String description,
                                       LocalDate date,
                                       LocalTime time,
                                       int capacity,
                                       boolean isPrivate,
                                       User createdBy,
                                       String title,
                                       String location,
                                       String logo) {
        Event event = new Event();

        event.setDescription(description);
        event.setDate(date);
        event.setTime(time);
        event.setCapacity(capacity);
        event.setPrivate(isPrivate);
        event.setCreatedBy(createdBy);
        event.setTitle(title);
        event.setLocation(location);
        event.setLogo(logo);

        return event;
    }
}
