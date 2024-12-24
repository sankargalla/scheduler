package com.saviour.scheduler.service;

import com.saviour.scheduler.model.CurrentWeekSchedule;
import com.saviour.scheduler.model.User;
import com.saviour.scheduler.repository.CurrentWeekScheduleRepo;
import com.saviour.scheduler.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CurrentWeekScheduleService {

    @Autowired
    CurrentWeekScheduleRepo currentWeekScheduleRepo;

    @Autowired
    private UserRepository userRepository;


    public List<CurrentWeekSchedule> getCurrentWeekScheduleOfUser(Long id) {
        return currentWeekScheduleRepo.findByUserId(id);
    }

//    public String addUserWeekSchedule(List<CurrentWeekSchedule> schedules, Long userId) {
//
//        User user = userRepository.findById(Math.toIntExact(userId)).orElseThrow(() -> new RuntimeException("User not found"));
//
//        for (CurrentWeekSchedule schedule : schedules) {
//            schedule.setUser(user);  // Ensure the user is set for each schedule
//        }
//        currentWeekScheduleRepo.saveAll(schedules);
//
//        return "User Schedules added successfully";
//    }
}
