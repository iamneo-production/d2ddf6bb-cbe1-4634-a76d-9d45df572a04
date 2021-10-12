package com.examly.springapp.controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import com.examly.springapp.service.SignupService;
import com.examly.springapp.model.UserModel;
import java.util.List;

@RestController
public class SignupController {
    
    @Autowired
    private SignupService signupService;

    @PostMapping("/signup")
    public boolean saveUser(@RequestBody UserModel user){
        if(!signupService.isUserPresent(user.getEmail())){
            signupService.saveUser(user);
            return true;
        }
        return false;
    }

    /*@RequestMapping("/getsignup")
    public List<UserModel> getUsers(){
        return signupService.getUsers();
    }*/
}
