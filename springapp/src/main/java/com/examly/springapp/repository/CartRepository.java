package com.examly.springapp.repository;

import org.springframework.data.repository.CrudRepository;

public interface CartRepository extends CrudRepository<CartModel, String> {

    //findBy__
    /*
    userId : UserModel is attribute in CartMode, email is id of UserModel
     */
    List<CartModel> findAllByUserIdEmail(String id);

}
