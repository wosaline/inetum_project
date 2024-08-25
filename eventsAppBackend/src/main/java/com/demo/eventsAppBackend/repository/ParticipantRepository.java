package com.demo.eventsAppBackend.repository;

import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.Participant;

import com.demo.eventsAppBackend.model.User;
import com.demo.eventsAppBackend.model.ParticipantStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ParticipantRepository extends JpaRepository<Participant, Integer> {

    Participant findById(int id);
    List<Participant> findAllByUserIdAndStatusIn(int userId, List<ParticipantStatus> statuses);

    @Query("SELECT p FROM Participant p WHERE p.user.id = :userId AND p.event.id = :eventId")
    Participant findByUserIdAndEventId(@Param("userId") int userId, @Param("eventId") int eventId);



}
