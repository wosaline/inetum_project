package com.demo.eventsAppBackend.model;

public enum UserRole {
    USER("USER"),
    ADMIN("ADMIN");

    public final String label;

    UserRole(String label) {
        this.label = label;
    }
}
