package com.demo.eventsAppBackend.model;

public enum ParticipantStatus {

    INVITED("INVITED"),
    ACCEPTED("ACCEPTED"),
    DECLINED("DECLINED"),
    CANCELED("CANCELED");

    public final String label;

    ParticipantStatus(String label) {
        this.label = label;
    }
}
