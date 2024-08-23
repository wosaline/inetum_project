package com.demo.eventsAppBackend.repository;

import com.demo.eventsAppBackend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {
    Event findById(int id);
    List<Event> findAll();
    List<Event> findAllByCreatedByUserId(int userId);
}
