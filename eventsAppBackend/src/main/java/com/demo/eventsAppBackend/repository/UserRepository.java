package com.demo.eventsAppBackend.repository;

import com.demo.eventsAppBackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findById(int id);
    List<User> findAll();
    User findByUsername(String username);
}
