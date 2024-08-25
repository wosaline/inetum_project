package com.demo.eventsAppBackend.model.converter;

import com.demo.eventsAppBackend.model.Comment;
import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.User;

public class CommentConverter {
    public static Comment convertToComment(Event event, User user,String content,int rating){

        Comment comment =new Comment();
        comment.setEvent(event);
        comment.setUser(user);
        comment.setContent(content);
        comment.setRating(rating);

        return comment;

    }
}
