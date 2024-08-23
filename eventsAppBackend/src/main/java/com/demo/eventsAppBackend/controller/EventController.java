package com.demo.eventsAppBackend.controller;

import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.User;
import com.demo.eventsAppBackend.model.converter.EventConverter;
import com.demo.eventsAppBackend.service.EventService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/events")
    @ResponseBody
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }

    @GetMapping("/events/{eventId}")
    @ResponseBody
    public ResponseEntity<Event> getEventById(@PathVariable int eventId) {
        try {
            return ResponseEntity.ok(eventService.getEventById(eventId));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
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
        try {
            User user = new User();
            user.setId(createdBy);
            Event event = EventConverter.convertToEvent(description, date, time, capacity, isPrivate, user, title, location, logo);
            return ResponseEntity.ok(eventService.addEvent(event));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/events/{eventId}")
    @ResponseBody
    public ResponseEntity<Event> updateEvent(
            @PathVariable int eventId,
            @RequestParam("description") String description,
            @RequestParam("date") LocalDate date,
            @RequestParam("time") LocalTime time,
            @RequestParam("capacity") int capacity,
            @RequestParam("is_private") boolean isPrivate,
            @RequestParam("created_by") int createdBy,
            @RequestParam("title") String title,
            @RequestParam("location") String location,
            @RequestParam(value = "logo", required = false, defaultValue = "") String logo) {
        try {
            User user = new User();
            user.setId(createdBy);
            Event event = EventConverter.convertToEvent(description, date, time, capacity, isPrivate, user, title, location, logo);
            return ResponseEntity.ok(eventService.updateEvent(eventId, event));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/events/{eventId}")
    @ResponseBody
    public ResponseEntity<String> deleteEvent(@PathVariable int eventId) {
        try {
            eventService.deleteEvent(eventId);
            return ResponseEntity.ok("Event successfully deleted");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
