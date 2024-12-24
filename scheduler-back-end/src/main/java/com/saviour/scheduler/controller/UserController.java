package com.saviour.scheduler.controller;

import com.saviour.scheduler.model.LoginRequest;
import com.saviour.scheduler.model.User;
import com.saviour.scheduler.repository.UserRepository;
import com.saviour.scheduler.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    UserService service;
    UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> addUser(@RequestBody User user){
        if (user.getSchedules() == null) {
            user.setSchedules(new ArrayList<>());
        }
        service.addUser(user);
        return new ResponseEntity<>("User Registration Successful", HttpStatus.CREATED);
    }

    @GetMapping("/register")
    public List<User> getUser(){
        return service.getUsers();

    }
//    @GetMapping("/users/email/{email}")
//    public ResponseEntity<User> getUserByEmail(@PathVariable String email){
//        User u = service.getUserByEmail(email);
//        if(u != null)
//            return ResponseEntity.ok(u);
//        else
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
//
//    }

    @PostMapping("/login")
    public ResponseEntity<User> validateUser(@RequestBody LoginRequest loginRequest) {

        if(service.validateUser(loginRequest.getEmail(),loginRequest.getPassword())){
            System.out.println("****Login Success****");
            User user = service.getUserWithSchedules(loginRequest.getEmail());
            return ResponseEntity.ok(user);
        }
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

}
