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

    @GetMapping("/getUserDataByMobileNumber")
    @CrossOrigin(origins = "*")
    public User getUserDataByMobileNumber(@RequestParam String mobileNumber){
        List<User> data=Repo.findAll();
        for(User x:data){
            System.out.print(x.mobileNumber);
            System.out.print("\n");
            if(Objects.equals(x.mobileNumber, mobileNumber)){
                return x;
            }
        }
        return null;
    }

    @GetMapping("/getUserDataById")
    @CrossOrigin(origins = "*")
    public User getUserDataById(@RequestParam String id){
        return Repo.findById(id).orElse(null);
    }

    @PostMapping("/addNewUser")
    @CrossOrigin(origins = "*")
    public User addNewUser(@RequestBody User details){
        return Repo.save(details);
    }
    @PatchMapping("/updateUser")
    @CrossOrigin(origins = "*")
    public User updateUser(@RequestBody User details){
        return Repo.save(details);
    }
}
