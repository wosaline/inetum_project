package com.demo.eventsAppBackend.repository;

import com.demo.eventsAppBackend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Integer> {
}
