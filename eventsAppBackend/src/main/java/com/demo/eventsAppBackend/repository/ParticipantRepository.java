package com.demo.eventsAppBackend.repository;

import com.demo.eventsAppBackend.model.Participant;
import com.demo.eventsAppBackend.model.ParticipantStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipantRepository extends JpaRepository<Participant, Integer> {

    Participant findById(int id);
    List<Participant> findAllByUserIdAndStatusIn(int userId, List<ParticipantStatus> statuses);

}
