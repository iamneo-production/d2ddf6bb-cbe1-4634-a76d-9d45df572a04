package com.examly.springapp.repository;

import org.springframework.data.repository.CrudRepository;
import com.examly.springapp.model.UserModel;
import java.util.List;
import java.util.Optional;
import com.examly.springapp.security.SafeUserData;
import org.springframework.data.jpa.repository.Query;


public interface UserRepository extends CrudRepository<UserModel, String> {
    Optional<UserModel> findByEmail(String email);
    Optional<UserModel> findByEmailVerificationCode(String code);
    Optional<UserModel> findByPasswordResetCode(String code);
    Boolean existsByEmail(String email);
    
    @Query("SELECT u FROM UserModel u")
    List<SafeUserData> findUsersForListing();
}