package com.demo.eventsAppBackend.controller;

import com.demo.eventsAppBackend.model.Comment;
import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.User;
import com.demo.eventsAppBackend.model.converter.CommentConverter;
import com.demo.eventsAppBackend.model.converter.EventConverter;
import com.demo.eventsAppBackend.service.CommentService;
import com.demo.eventsAppBackend.service.EventService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CommentController {
    private final CommentService commentService;
    private final EventService eventService;

    public CommentController(CommentService commentService,EventService eventService) {
        this.commentService = commentService;
        this.eventService=eventService;
    }

    // Create a comment
    @PostMapping("/comments")
    @ResponseBody
    public ResponseEntity<Object> createComment(
            @RequestParam("event_id") int eventId,
            @RequestParam("user_id") int userId,
            @RequestParam("content") String content,
            @RequestParam("rating") int rating
    ) {
        try {
            Event event =new Event();
            event.setId(eventId);
            User user = new User();
            user.setId(userId);
            Comment comment = CommentConverter.convertToComment(event, user, content, rating);
            return ResponseEntity.ok(commentService.addComment(comment));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.badRequest().body("Error while creating category: "+ e.getMessage());
        }
    }

    // Get comment by event ID
    @GetMapping("/comments/{eventId}")
    public List<Comment> getCommentsByEvent(@PathVariable int eventId) {
        Event event = eventService.getEventById(eventId);
        if (event == null) {
            throw new EntityNotFoundException("Event not found");
        }
        return commentService.getCommentsByEvent(event);
    }

    // D
    @DeleteMapping("/comment/{commentId}")
    @ResponseBody
    public ResponseEntity commentUser(@PathVariable int commentId) {
        try {
            commentService.deleteComment(commentId);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
