package com.saviour.scheduler.service;

import com.saviour.scheduler.model.User;
import com.saviour.scheduler.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository repository;

    public void addUser(User user) {
        repository.save(user);
    }

    public List<User> getUsers() {

        return repository.findAll();
    }

//    public User getUserByEmail(String email) {
//        Optional<User> userOptional = repository.findByEmail(email);
//        System.out.println("User details: "+userOptional.get());
//        if (userOptional.isPresent()) {
//            // Log the user for debugging
//            System.out.println("User details: "+userOptional.get());
//            // Return the user wrapped in a ResponseEntity with HTTP 200 OK
//            return userOptional.get();
//        } else {
//            // Handle case where user is not found
//            return null;
//        }
//    }

    public User getUserWithSchedules(String email) {
        return repository.findByEmailWithSchedules(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public boolean validateUser(String email, String password){
        List<User> users = repository.findAll();
        for(User u: users){
            if(u.getEmail().equals(email) && u.getPassword().equals(password))
                return true;
        }
        return false;
    }
}
