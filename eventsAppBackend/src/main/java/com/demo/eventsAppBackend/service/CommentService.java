package com.demo.eventsAppBackend.service;

import com.demo.eventsAppBackend.model.Comment;
import com.demo.eventsAppBackend.model.Event;

import java.util.List;

public interface CommentService {
    Comment addComment(Comment comment);
    List<Comment> getCommentsByEvent(Event event);
    void deleteComment(int commentId);
}
