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
import com.examly.springapp.service.EmailSenderService;
import javax.mail.MessagingException;
import com.examly.springapp.repository.UserRepository;
import java.util.List;
import java.util.UUID;

@RestController
public class SignupController {
    @Autowired
    private AuthService authService;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private EmailSenderService emailSenderService;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<String> saveUser(@RequestBody UserModel user) throws MessagingException{

        if (!authService.doesUserExist(user.getEmail())){
            String code = UUID.randomUUID().toString();
            user.setEmailVerificationCode(code);

           // sent e-mail verification mail (only for user);
            if(!(user.getEmail().equals("admin@store.com")))
            {
                String user_mail = user.getEmail();
                String subject = "Verify your email";
                String body= "https://8080-abbdbbbadeafdbbfefdfebbbddeeacdffcdafff.examlyiopb.examly.io/verifyEmail/" + code;
                emailSenderService.sendSimpleEmail(user_mail,body,subject);
            }
            
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
