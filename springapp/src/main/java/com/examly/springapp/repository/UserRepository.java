package com.examly.springapp.repository;

import org.springframework.data.repository.CrudRepository;
import com.examly.springapp.model.UserModel;
import java.util.List;

public interface UserRepository extends CrudRepository<UserModel, String> {
    UserModel findByEmail(String email);
}