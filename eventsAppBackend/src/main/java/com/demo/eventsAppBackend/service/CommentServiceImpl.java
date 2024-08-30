package com.demo.eventsAppBackend.service;

import com.demo.eventsAppBackend.model.*;
import com.demo.eventsAppBackend.repository.CommentRepository;
import com.demo.eventsAppBackend.repository.EventRepository;
import com.demo.eventsAppBackend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService{
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final ParticipantService participantService;

    public CommentServiceImpl(EventRepository eventRepository, UserRepository userRepository, CommentRepository commentRepository,ParticipantService participantService) {
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
        this.participantService=participantService;

    }

    @Override
    public Comment addComment(Comment comment) {
        User user = userRepository.findById(comment.getUser().getId());
        Event event=eventRepository.findById(comment.getEvent().getId());
        if (user == null) {
            throw new EntityNotFoundException("User not found");
        }
        if (event == null) {
            throw new EntityNotFoundException("Event not found");
        }

        // Check if the event is finished
        if (event.getDate() == null || event.getDate().isAfter(LocalDate.now())) {
            throw new IllegalStateException("Event is not finished yet. Cannot add comment.");
        }

        //   Vérifiez si l'utilisateur est un participant à l'événement avec le statut ACCEPTED
         Participant participant = participantService.findParticipantByUserIdAndEventId( user.getId(),event.getId());
        if (participant == null || participant.getStatus() != ParticipantStatus.ACCEPTED) {
            throw new SecurityException("User is not allowed to comment on this event");
            }

        comment.setUser(user);
        comment.setEvent(event);
        comment.setCreatedAt(LocalDateTime.now());
        comment.setUpdatedAt(LocalDateTime.now());
        Comment savedComment = commentRepository.save(comment);

        commentRepository.save(comment);

        return savedComment;
    }

    @Override
    public List<Comment> getCommentsByEvent(Event event) {
        return commentRepository.findAllByEvent(event);
    }

    @Override
    public void deleteComment(int commentId){
        Comment comment = commentRepository.findById(commentId);
        if (comment == null) {
            throw new EntityNotFoundException("Commentaire à supprimer non trouvé");
        }
        commentRepository.delete(comment);
    }
}
