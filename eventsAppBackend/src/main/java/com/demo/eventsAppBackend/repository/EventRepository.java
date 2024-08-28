package com.demo.eventsAppBackend.repository;

import com.demo.eventsAppBackend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface EventRepository extends JpaRepository<Event, Integer> {
    Event findById(int id);

    List<Event> findAll();

    @Query("SELECT e FROM Event e " +
            "LEFT JOIN Participant p ON e.id = p.event.id " +
            "WHERE e.date = :date " +
            "AND (e.createdBy.id = :userId OR (p.user.id = :userId AND p.status IN ('ACCEPTED', 'INVITED'))) ")
    List<Event> findAllByDateAndByUserId(@Param("date")LocalDate date,@Param("userId")int userId);

    @Query("SELECT e FROM Event e WHERE YEAR(e.date) = :year AND MONTH(e.date) = :month")
    List<Event> findAllByYearAndMonth(@Param("year") int year, @Param("month") int month);

    @Query("SELECT DISTINCT e.date FROM Event e " +
            "LEFT JOIN Participant p ON e.id = p.event.id " +
            "WHERE (e.createdBy.id = :userId OR (p.user.id = :userId AND p.status IN ('ACCEPTED', 'INVITED'))) " +
            "AND YEAR(e.date) = :year AND MONTH(e.date) = :month")
    List<LocalDate> findDatesWithUserEvents(@Param("year") int year, @Param("month") int month, @Param("userId") int userId);
}
