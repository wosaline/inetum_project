package com.demo.eventsAppBackend.controller;

import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.User;
import com.demo.eventsAppBackend.model.converter.EventConverter;
import com.demo.eventsAppBackend.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@RestController
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService){
        this.eventService = eventService;
    }

    @PostMapping("/events")
    @ResponseBody
    public ResponseEntity<Event> createNewEvent(
            @RequestParam("description") String description,
            @RequestParam("date") LocalDate date,
            @RequestParam("time") LocalTime time,
            @RequestParam("capacity") int capacity,
            @RequestParam("is_private") boolean isPrivate,
            @RequestParam("created_by") int createdBy,
            @RequestParam("title") String title,
            @RequestParam("location") String location
            ){
        User user = new User();
        user.setUserId(1);
        if(user != null){
            Event event = EventConverter.convertToEvent(description, date, time, capacity, isPrivate, user, LocalDateTime.now(), null, title, location);
            return ResponseEntity.ok(eventService.addEvent(event));
        }else{
            return ResponseEntity.badRequest().build();
        }
    }
}
