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
    List<Event> findAllByDate(LocalDate Date);
    @Query("SELECT e FROM Event e WHERE YEAR(e.date) = :year AND MONTH(e.date) = :month")
    List<Event> findAllByYearAndMonth(@Param("year") int year, @Param("month") int month);
    @Query("SELECT DISTINCT e.date FROM Event e WHERE YEAR(e.date) = :year AND MONTH(e.date) = :month")
    List<LocalDate> findDatesWithEvents(@Param("year") int year, @Param("month") int month);
}
