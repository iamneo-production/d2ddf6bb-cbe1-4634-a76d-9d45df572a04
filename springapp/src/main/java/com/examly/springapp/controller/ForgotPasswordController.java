package com.examly.springapp.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import com.examly.springapp.service.ProductService;
import com.examly.springapp.service.AuditService;
import com.examly.springapp.model.ProductModel;
import com.examly.springapp.model.UserModel;
import com.examly.springapp.model.AuditModel;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import java.util.*;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.BadCredentialsException;
import java.lang.*;
import java.util.UUID;
import com.examly.springapp.model.UserModel;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.service.EmailSenderService;
import javax.mail.MessagingException;



@RestController
public class ForgotPasswordController {
    String newPassword  = "", token = "";
    @Autowired
    private UserRepository userRepository;

   @Autowired
   private EmailSenderService emailSenderService;

    @PostMapping("/forgotPassword")
    public ResponseEntity<String> sendEmailToken(@AuthenticationPrincipal UserModel user,@RequestBody String  email) throws MessagingException
    {
        try
        {
            String code = UUID.randomUUID().toString();
            user.setPasswordResetCode(code);
            userRepository.save(user);
            emailSenderService.sendSimpleEmail(email,code,"Reset your Password");
            return  ResponseEntity.ok()
            .body("Password reset code sent");
        }
        catch(Exception e)
        {
            return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .header("Error-Message", "Something went wrong")
            .body("false");
        }

    }

    @PostMapping("/resetPassword")
    public ResponseEntity<String> resetPassword(@AuthenticationPrincipal UserModel user,@RequestBody Map<String,String> data)
    {
     
        data.forEach((k,v) -> {
        if(k.equals("newPassword"))
           newPassword = v;
        else
            token = v;
        }
        );
        String user_token = user.getPasswordResetCode();
        if(user_token.equals(token))
        {
            user.setPassword(newPassword);
            userRepository.save(user);
            return  ResponseEntity.ok()
            .body("Password changed sucessfully");
        }
        else
        {
            return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .header("Error-Message", "Invalid Token")
            .body("false");
        }
       

    }
    
}
