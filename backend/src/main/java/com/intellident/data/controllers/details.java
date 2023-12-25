package com.intellident.data.controllers;

import com.intellident.data.Repositories.MongoRepo;
import com.intellident.data.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
@RestController
@CrossOrigin(origins = "*")
public class details {
    @Autowired
    MongoRepo Repo;
    @GetMapping("/getUser")
    @CrossOrigin(origins = "*")
    public User getUserData(@RequestParam String mobileNo){
        List<User> data=Repo.findAll();
        for(User x:data){
            System.out.print(x.mobileNo);
            System.out.print("\n");
            if(Objects.equals(x.mobileNo, mobileNo)){
                return x;
            }
        }
        return null;
    }
    @PostMapping("/addNewUser")
    @CrossOrigin(origins = "*")
    public User addUser(@RequestBody User details){
        return Repo.save(details);
    }
}