package com.examly.springapp.controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.*;
import com.examly.springapp.service.AuthService;
import com.examly.springapp.model.UserModel;
import com.examly.springapp.model.AuditModel;
import javax.mail.MessagingException;
import com.examly.springapp.repository.UserRepository;
import com.examly.springapp.repository.AuditRepository;
import java.util.List;
import java.util.ArrayList;
import java.util.UUID;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import com.examly.springapp.security.SafeUserData;

@RestController
public class AuditController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuditRepository auditRepository;

    @GetMapping("/admin/users")
    public ResponseEntity<List<SafeUserData>> getUsers(@AuthenticationPrincipal UserModel user) {
        String role = user.getRole();

        if(role.equals("User")) {   
            return ResponseEntity
            .status(HttpStatus.FORBIDDEN)
            .header("Error-Message", "UnAuthorized access")
            .body(List.of());
        }
        else {
            List<SafeUserData> users = this.userRepository.findUsersForListing();
            return ResponseEntity.ok()
            .body(users);
        }
    }

    @GetMapping("/admin/users/{id}/logs")
    public ResponseEntity<List<AuditModel>> getUserLogs(@AuthenticationPrincipal UserModel user, @PathVariable String id) {
        String role = user.getRole();

        if(role.equals("User")) {   
            return ResponseEntity
            .status(HttpStatus.FORBIDDEN)
            .header("Error-Message", "UnAuthorized access")
            .body(List.of());
        }
        else {
            List<AuditModel> logs = this.auditRepository.findAllByUserId(Long.parseLong(id));
            return ResponseEntity.ok()
            .body(logs);
        }
    }
}
