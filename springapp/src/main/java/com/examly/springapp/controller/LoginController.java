package com.examly.springapp.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.examly.springapp.model.UserModel;
import com.examly.springapp.model.LoginModel;
import java.util.List;
import org.springframework.security.authentication.AuthenticationManager;
import com.examly.springapp.security.JwtTokenUtil;
import com.examly.springapp.encryption.Crypto;
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
            //System.out.println("verified :" + user.getVerified());
            if (!user.getVerified()) {
                return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .header("Error-Message", "Please verify your email before logging in.")
                    .body("false");
            }

            return ResponseEntity.ok()
                .header(
                    HttpHeaders.AUTHORIZATION,
                    this.jwtTokenUtil.generateAccessToken(user)
                )
                .header("User-Role", user.getRole())
                .body("true");
        } catch (BadCredentialsException ex) {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .header("Error-Message", "Invalid Email / Password.")
                .body("false");
        }
    }

}
