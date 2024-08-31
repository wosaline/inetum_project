package com.demo.eventsAppBackend.repository;


import com.demo.eventsAppBackend.model.Comment;
import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findAllByEvent(Event event);
    Comment findById(int id);
    List<Comment> findAll();

    @Query("SELECT AVG(c.rating) FROM Comment c WHERE c.event = :event")
    Double findAverageRatingByEvent(@Param("event") Event event);
}
