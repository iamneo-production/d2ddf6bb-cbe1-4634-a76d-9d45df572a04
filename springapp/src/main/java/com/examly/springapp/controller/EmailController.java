package com.examly.springapp.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import com.examly.springapp.service.EmailSenderService;
import javax.mail.MessagingException;
import com.examly.springapp.model.UserModel;
import com.examly.springapp.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.BadCredentialsException;
import java.lang.*;
import org.springframework.http.*;
import com.examly.springapp.model.AuditModel;
import com.examly.springapp.service.AuditService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import java.util.*;

@RestController
public class EmailController {
    
  @Autowired
  private EmailSenderService emailSenderService;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private AuditService auditService;
  @PostMapping("/admin/mail")
  public ResponseEntity<String> sendMail(@AuthenticationPrincipal UserModel user,@RequestBody String body) throws MessagingException
  {
    try
    {
      if(user.getRole().equals("User"))
      {
        throw new BadCredentialsException("UnAuthorized Access");
      }
      else
      {
        var it = userRepository.findAll();
        var users = new ArrayList<UserModel>();
        it.forEach(e -> users.add(e));
        for(int i = 0; i<users.size(); i++)
        { 
          emailSenderService.sendSimpleEmail(users.get(i).getEmail(),body,"New mobiles are in the store");
        }
        this.auditService.saveAudit(new AuditModel(user.getId(), "Admin sent a e-mail to all the users"));
         return ResponseEntity.ok()
         .header("Action", "Emails sent Sucessfully")
         .body("true");

      }

    }
    catch(BadCredentialsException e)
    {
      return ResponseEntity
      .status(HttpStatus.FORBIDDEN)
      .header("Error message", "UnAuthorized Access")
      .body("false");
    }
    catch(Exception e)
    {
      return ResponseEntity
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .header("Error message", "Something went wrong please try again")
      .body("false");
    }
   
  }
  @RequestMapping("/verifyEmail/{id}")
  public ResponseEntity<String> verifyEmail(@PathVariable String id)
  {
    try
    {
      UserModel user = userRepository.findByEmail(id).get();
      user.setVerified(true);
      userRepository.save(user);
      this.auditService.saveAudit(new AuditModel(user.getId(), "User verified his/her e-mail  " + user.getEmail()));
      return ResponseEntity.ok()
      .header("Action", "Email verified")
      .body("Your Email verified sucessfully");
    }
    catch(Exception e)
    {
      return ResponseEntity
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .header("Error message", "something went wrong..")
      .body("false");
    }
 }

}
