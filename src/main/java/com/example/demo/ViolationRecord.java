package com.example.demo;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Table(name = "violations")
@Data // Requires Lombok
public class ViolationRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String vehicleId;
    private double speed;
    private String zone;
    private int fine;
    @CreationTimestamp
    @Column(name = "timestamp", nullable = false, updatable = false)
    private LocalDateTime timestamp;
}