package com.saviour.scheduler.repository;

import com.saviour.scheduler.model.CurrentWeekSchedule;
import com.saviour.scheduler.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CurrentWeekScheduleRepo extends JpaRepository<CurrentWeekSchedule, Integer> {

    List<CurrentWeekSchedule> findByUserId(Long userId);
}
