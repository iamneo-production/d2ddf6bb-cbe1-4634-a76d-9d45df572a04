package com.examly.springapp.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import com.examly.springapp.service.ProductService;
import com.examly.springapp.service.AuditService;
import com.examly.springapp.model.ProductModel;
import com.examly.springapp.model.UserModel;
import com.examly.springapp.model.AuditModel;
import com.examly.springapp.service.AuditService;
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
import org.springframework.security.crypto.password.PasswordEncoder;
import java.net.InetAddress;



@RestController
public class ForgotPasswordController {
    String newPassword = "", token = "";
    
   @Autowired
    private UserRepository userRepository;

   @Autowired
   private EmailSenderService emailSenderService;

   @Autowired
   private PasswordEncoder passwordEncoder;

   @Autowired
   private AuditService auditService;


    @PostMapping("/forgotPassword/{email}")
    public ResponseEntity<String> sendEmailToken(@PathVariable String  email) throws MessagingException
    {
        try
        {
            UserModel user = userRepository.findByEmail(email).orElseThrow(
                () -> new Exception(
                    String.format("User: %s, not found", email)
                )
            );
            String code = UUID.randomUUID().toString();
            String url = "https://8081-" + InetAddress.getLocalHost().getHostName().replace("-0", ".examlyiopb.examly.io") + "/reset-password/" + code;
            user.setPasswordResetCode(code);
            userRepository.save(user);
            emailSenderService.sendSimpleEmail(email, url, "Reset your Password");
            this.auditService.saveAudit(new AuditModel(user.getId(), "Password reset code was sent to the user with mail-id " + user.getEmail()));
            return  ResponseEntity.ok()
            .body("Password reset code sent");
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity
            .status(HttpStatus.INTERNAL_SERVER_ERROR)
            .header("Error-Message", "Something went wrong")
            .body("false");
        }

    }

    @PostMapping("/resetPassword")
    public ResponseEntity<String> resetPassword(@RequestBody Map<String,String> data)
    {
        data.forEach((k,v) -> {
            if(k.equals("newPassword"))
                newPassword = v;
            else
                token = v;
        });
        try {
            UserModel user = userRepository.findByPasswordResetCode(token).orElseThrow(
                () -> new Exception("User not Found")
            );
            String encryptPassword = passwordEncoder.encode(newPassword);
            user.setPassword(encryptPassword);
            userRepository.save(user);
            this.auditService.saveAudit(new AuditModel(user.getId(),"User changed his Password with email " + user.getEmail()));
            user.setPasswordResetCode(null);
            userRepository.save(user);
            return  ResponseEntity.ok()
            .body("Password changed sucessfully");
        }
        catch(Exception e)
        {
            System.out.println(e);
            return ResponseEntity
            .status(HttpStatus.BAD_REQUEST)
            .header("Error-Message", "Invalid Token.")
            .body("false");
        }
    }
    
}
