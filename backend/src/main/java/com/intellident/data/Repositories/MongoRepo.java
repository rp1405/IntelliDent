package com.intellident.data.Repositories;

import com.intellident.data.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MongoRepo extends MongoRepository<User,String> {

}
