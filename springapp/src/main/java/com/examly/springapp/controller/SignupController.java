package com.examly.springapp.controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.http.*;
import com.examly.springapp.service.AuthService;
import com.examly.springapp.model.UserModel;
import com.examly.springapp.security.JwtTokenUtil;
import java.util.List;

@RestController
public class SignupController {
    @Autowired
    private AuthService authService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @PostMapping("/signup")
    public ResponseEntity<String> saveUser(@RequestBody UserModel user){
        // TODO send email verification to email


        if (!authService.doesUserExist(user.getEmail())){
            authService.saveUser(user);

            return ResponseEntity.ok().body("true");
        }
        else {
            return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .header("Error-Message", "This email is already in use.")
            .body("false");
        }        
    }
}
