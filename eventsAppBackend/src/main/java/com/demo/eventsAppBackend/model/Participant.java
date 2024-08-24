package com.demo.eventsAppBackend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "PARTICIPANT")
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "EVENT_ID")
    private Event event;

    @Column(name = "INVITED_AT")
    private LocalDateTime invitedAt;

    @Column(name = "RESPONDED_AT")
    private LocalDateTime respondedAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private ParticipantStatus status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public LocalDateTime getInvitedAt() {
        return invitedAt;
    }

    public void setInvitedAt(LocalDateTime invitedAt) {
        this.invitedAt = invitedAt;
    }

    public LocalDateTime getRespondedAt() {
        return respondedAt;
    }

    public void setRespondedAt(LocalDateTime respondedAt) {
        this.respondedAt = respondedAt;
    }

    public ParticipantStatus getStatus() {
        return status;
    }

    public void setStatus(ParticipantStatus status) {
        this.status = status;
    }

    @PrePersist
    protected void onCreate() {
        this.invitedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.respondedAt = LocalDateTime.now(); // Met à jour updatedAt lors des modifications
    }
}
