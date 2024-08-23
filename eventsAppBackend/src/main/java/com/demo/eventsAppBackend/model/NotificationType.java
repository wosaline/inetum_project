package com.demo.eventsAppBackend.model;

public enum NotificationType {
    INVITATION("INVITATION"),
    REMINDER("REMINDER"),
    UPDATE("UPDATE");

    public final String label;

    NotificationType(String label) {
        this.label = label;
    }
}
