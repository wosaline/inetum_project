package com.demo.eventsAppBackend.repository;


import com.demo.eventsAppBackend.model.Comment;
import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findAllByEvent(Event event);
    Comment findById(int id);
}
