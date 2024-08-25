package com.demo.eventsAppBackend.controller;

import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.Participant;
import com.demo.eventsAppBackend.model.User;
import com.demo.eventsAppBackend.model.converter.EventConverter;
import com.demo.eventsAppBackend.service.EventService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
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
            @RequestParam("private") boolean isPrivate,
            @RequestParam("createdBy") int createdBy,
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
            @RequestParam("private") boolean isPrivate,
            @RequestParam("createdBy") int createdBy,
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
    public ResponseEntity deleteEvent(@PathVariable int eventId) {
        try {
            eventService.deleteEvent(eventId);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/events/{eventId}/invite")
    @ResponseBody
    public ResponseEntity<Participant> inviteUserToEvent(
            @PathVariable int eventId,
            @RequestParam("userId") int userId,
            @RequestParam("creatorId") int creatorId) {
        try {
            Participant participant = eventService.inviteUsersToEvent(eventId, userId, creatorId);
            return ResponseEntity.ok(participant);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PutMapping("/events/{eventId}/invite/{participantId}")
    @ResponseBody
    public ResponseEntity<Participant> respondToInvitation(
            @PathVariable int eventId,
            @PathVariable int participantId,
            @RequestParam("userId") int userId,
            @RequestParam("response") String response) {

        try {
            Participant updatedParticipant = eventService.updateParticipant(participantId, eventId, userId, response);
            return ResponseEntity.ok(updatedParticipant);

        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build(); // participant not found
        } catch (SecurityException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // user not authorized
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(null);  // Statut non modifiable
        }
    }
}
