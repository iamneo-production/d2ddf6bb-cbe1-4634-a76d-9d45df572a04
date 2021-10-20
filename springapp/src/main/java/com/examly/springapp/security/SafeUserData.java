package com.examly.springapp.security;

public interface SafeUserData {
    Long getId();
    String getEmail();
    String getUsername();
    String getMobileNumber();
    String getActive();
    String getRole();
}