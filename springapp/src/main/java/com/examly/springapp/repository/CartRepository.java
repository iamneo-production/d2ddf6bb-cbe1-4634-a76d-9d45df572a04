package com.examly.springapp.repository;

import org.springframework.data.repository.CrudRepository;
import com.examly.springapp.model.CartModel;
import java.util.List;

public interface CartRepository extends CrudRepository<CartModel, String> {

    //findBy__
    /*
    userId : UserModel is attribute in CartMode, email is id of UserModel
     */
    List<CartModel> findAllByUserId_Email(String id);

}