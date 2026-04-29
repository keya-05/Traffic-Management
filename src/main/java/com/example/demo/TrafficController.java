package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.jpa.repository.Query;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/traffic")
@CrossOrigin(origins = "*") // Allows Netlify to call this API
public class TrafficController {

    @Autowired
    private ViolationRepository repository;

    @PostMapping("/process")
    public ViolationRecord processTraffic(@RequestBody VehicleEvent event) {
        int fine = 0;
        
        // Logic from your SmartTrafficSystem.java
        if (event.getSpeed() > 80 && !event.isEmergencyVehicle()) {
            if (event.getSpeed() > 120) fine = 5000;
            else if (event.getSpeed() > 100) fine = 2000;
            else fine = 1000;
        }

        ViolationRecord record = new ViolationRecord();
        record.setVehicleId(event.getVehicleId());
        record.setSpeed(event.getSpeed());
        record.setZone(event.getZone());
        record.setFine(fine);

        if (fine > 0) {
            return repository.save(record);
        }
        return record;
    }
    @GetMapping("/summary")
        public Map<String, Double> getFinesSummary() {
            // This fetches all records and sums the fines by zone using Java Streams
            return repository.findAll().stream()
                    .collect(Collectors.groupingBy(
                            ViolationRecord::getZone,
                            Collectors.summingDouble(ViolationRecord::getFine)
                    ));
}
}