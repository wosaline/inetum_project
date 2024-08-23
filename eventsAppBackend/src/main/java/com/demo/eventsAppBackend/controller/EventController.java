package com.demo.eventsAppBackend.controller;

import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.User;
import com.demo.eventsAppBackend.model.converter.EventConverter;
import com.demo.eventsAppBackend.repository.UserRepository;
import com.demo.eventsAppBackend.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@RestController
public class EventController {
    private final EventService eventService;
    private final UserRepository userRepository;

    public EventController(EventService eventService, UserRepository userRepository) {
        this.eventService = eventService;
        this.userRepository = userRepository;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/events")
    @ResponseBody
    public ResponseEntity<List<Event>> getAllEvents(){
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/events/{eventId}")
    @ResponseBody
    public ResponseEntity<Event> getEventById(@PathVariable int eventId){
        return ResponseEntity.ok(eventService.getEventById(eventId));
    }

    @GetMapping("/events/by_user/{userId}")
    @ResponseBody
    public ResponseEntity<List<Event>> getEventsByUserId(@PathVariable int userId){
        return ResponseEntity.ok(eventService.getAllEventsByUserId(userId));
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
            @RequestParam("location") String location,
            @RequestParam(value = "logo", required = false, defaultValue = "") String logo
    ) {
        User user = userRepository.findById(createdBy);
        if (user != null) {
            Event event = EventConverter.convertToEvent(description, date, time, capacity, isPrivate, user, title, location, logo);
            return ResponseEntity.ok(eventService.addEvent(event));
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
