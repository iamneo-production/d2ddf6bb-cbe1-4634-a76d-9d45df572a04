package com.examly.springapp.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import com.examly.springapp.model.UserModel;
import com.examly.springapp.repository.UserRepository;

@Service
public class AuthService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserDetails user = userRepository.findByEmail(email).orElseThrow(
            () -> new UsernameNotFoundException(
                String.format("User: %s, not found", email)
            )
        );
        return user;
    }

    public Boolean doesUserExist(String email){
        return userRepository.existsByEmail(email);
    }

    public void saveUser(UserModel user){
        userRepository.save(user);
    }
}