package com.saviour.scheduler.controller;

import com.saviour.scheduler.model.CurrentWeekSchedule;
import com.saviour.scheduler.model.UserSchedule;
import com.saviour.scheduler.service.CurrentWeekScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:4200")
public class CurrentWeekScheduleController {

    @Autowired
    CurrentWeekScheduleService service;

    @GetMapping("/employee/{id}")
    public List<UserSchedule> getCurrentWeekScheduleOfUser(@PathVariable Long id){
        List<CurrentWeekSchedule> allSchedules = service.getCurrentWeekScheduleOfUser(id);

        // Map to exclude user details and create DTOs
        List<UserSchedule> userSchedules = allSchedules.stream()
                .map(schedule -> new UserSchedule(
                        schedule.getId(),
                        schedule.getDay(),
                        schedule.getStart(),
                        schedule.getEnd()
                ))
                .collect(Collectors.toList());
        return userSchedules;

    }

//    @PostMapping("/manager/{id}")
//    public void addUserWeekSchedule(@RequestBody List<CurrentWeekSchedule> schedules, @PathVariable Long id){
//        service.addUserWeekSchedule(schedules,id);
//    }


}
