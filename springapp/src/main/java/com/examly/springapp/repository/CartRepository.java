package com.examly.springapp.repository;


import org.springframework.data.repository.CrudRepository;
import com.examly.springapp.model.CartModel;
import java.util.List;

public interface CartRepository extends CrudRepository<CartModel, Long> {

    //findBy__
    List<CartModel> findAllByUserId(Long userId);


}
