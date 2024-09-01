package com.demo.eventsAppBackend.repository;

import com.demo.eventsAppBackend.model.Event;
import com.demo.eventsAppBackend.model.Participant;

import com.demo.eventsAppBackend.model.User;
import com.demo.eventsAppBackend.model.ParticipantStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ParticipantRepository extends JpaRepository<Participant, Integer> {

    Participant findById(int id);
    List<Participant> findAllByUserIdAndStatusIn(int userId, List<ParticipantStatus> statuses);

    @Query("SELECT p FROM Participant p WHERE p.user.id = :userId AND p.event.id = :eventId ORDER BY p.id ASC LIMIT 1")
    Participant findFirstByUserIdAndEventId(@Param("userId") int userId, @Param("eventId") int eventId);

    List<Participant> findAllByEventId(int eventId);

    @Query("SELECT p FROM Participant p WHERE p.event.id = :eventId AND p.status IN :statuses")
    List<Participant> findAllByEventIdAndStatusIn(@Param("eventId") int eventId, @Param("statuses") List<ParticipantStatus> statuses);
}
