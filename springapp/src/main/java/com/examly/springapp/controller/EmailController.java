package com.examly.springapp.controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import com.examly.springapp.service.EmailSenderService;
import javax.mail.MessagingException;
import com.examly.springapp.model.UserModel;
import com.examly.springapp.repository.UserRepository;
import java.util.*;

@RestController
public class EmailController {
    
  @Autowired
  private EmailSenderService emailSenderService;
  @Autowired
  private UserRepository userRepository;

  @PostMapping("/admin/mail")
  public String sendMail(@RequestBody String body) throws MessagingException
  {
     var it = userRepository.findAll();

    var users = new ArrayList<UserModel>();
    it.forEach(e -> users.add(e));
   for(int i = 0; i<users.size(); i++)
   { 
    emailSenderService.sendSimpleEmail(users.get(i).getEmail(),body,"New mobiles are in the store");
    System.out.println(users.get(i).getEmail());
    System.out.println("sent.....");
   }
  
   return("mails sent..");
  }

}
