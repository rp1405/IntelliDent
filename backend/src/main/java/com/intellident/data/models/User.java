package com.intellident.data.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "User")
public class User {
    @Id
    public String id;
    public String name;
    public String mobileNumber;
    public Number age;
    public String gender;
}