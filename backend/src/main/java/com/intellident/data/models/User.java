package com.intellident.data.models;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "User")
public class User {
    public static class Test {
        public static class Result{
            public static class Info{
                public String status;
                public String link;
            }
            public Info diastemia;
            public Info cavities;
            public Info dentalStain;
            public Info dentalCalculus;
        }
        public String testId;
        public Number time;
        public Result result;
    }
    @Id
    public String id;
    public String name;
    public String mobileNumber;
    public Number age;
    public String gender;
    public List<Test> tests;  
}