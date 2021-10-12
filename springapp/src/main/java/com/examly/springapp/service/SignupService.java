package com.examly.springapp.service;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.examly.springapp.repository.SignupRepository;
import com.examly.springapp.model.UserModel;
import java.util.*;

@Service
public class SignupService {
    @Autowired
    private SignupRepository signupRepository;

    /*this can be used to check whether a user with same 
    email exits or not*/
    public Boolean isUserPresent(String email){
        return signupRepository.existsByEmail(email);
    }

    /*inserting data*/
    public void saveUser(UserModel user){
        signupRepository.save(user);
    }
}
