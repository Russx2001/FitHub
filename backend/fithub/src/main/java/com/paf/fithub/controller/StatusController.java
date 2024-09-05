package com.paf.fithub.controller;

import com.paf.fithub.model.Status;
import com.paf.fithub.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/statuses")
public class StatusController {
    @Autowired
    private StatusService statusService;

    @PostMapping
    public ResponseEntity<?> saveStatus(@RequestBody Status status) {
        return statusService.saveStatus(status);
    }

    @GetMapping
    public ResponseEntity<?> getStatuses() {
        return statusService.getStatuses();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getStatusesByUserId(@PathVariable String id) {
        return statusService.getStatusesByUserId(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getStatusById(@PathVariable String id) {
        return statusService.getStatusById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStatusById(@PathVariable String id, @RequestBody Status status) {
        return statusService.updateStatusById(id, status);
    }

    @PutMapping("/like/{id}")
    public ResponseEntity<?> likeStatusById(@PathVariable String id, @RequestBody Status status) {
        return statusService.likeStatusById(id, status);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStatusById(@PathVariable String id) {
        return statusService.deleteStatusById(id);
    }

}
