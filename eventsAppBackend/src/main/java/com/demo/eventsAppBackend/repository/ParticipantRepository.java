package com.demo.eventsAppBackend.repository;

import com.demo.eventsAppBackend.model.Participant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ParticipantRepository extends JpaRepository<Participant, Integer> {

    List<Participant> findAll();

}
