package com.examly.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.examly.springapp.model.UserModel;

public interface SignupRepository extends JpaRepository<UserModel,java.lang.String>{
    
    //returns true or false whether such email present or not
    boolean existsByEmail(String email);
}
