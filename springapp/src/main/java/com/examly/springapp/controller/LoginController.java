package com.examly.springapp.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.examly.springapp.model.UserModel;
import com.examly.springapp.model.LoginModel;
import java.util.List;
import org.springframework.security.authentication.AuthenticationManager;
import com.examly.springapp.security.JwtTokenUtil;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.BadCredentialsException;

@RestController
public class LoginController {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;

    public LoginController(AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<String> checkUser(@RequestBody LoginModel request) {
        try {
            Authentication authenticate = authenticationManager
                .authenticate(
                    new UsernamePasswordAuthenticationToken(
                        request.getEmail(), request.getPassword()
                    )
                );
            UserModel user = (UserModel) authenticate.getPrincipal();
            return ResponseEntity.ok()
                .header(
                    HttpHeaders.AUTHORIZATION,
                    this.jwtTokenUtil.generateAccessToken(user)
                )
                .body("true");
        } catch (BadCredentialsException ex) {
            return new ResponseEntity<String>("false", HttpStatus.UNAUTHORIZED);
        }
    }

}
