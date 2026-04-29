package com.example.demo;

import lombok.Data;

@Data // This handles the getters/setters automatically
public class VehicleEvent {
    private String vehicleId;
    private double speed;
    private String zone;
    private boolean emergencyVehicle; 
}