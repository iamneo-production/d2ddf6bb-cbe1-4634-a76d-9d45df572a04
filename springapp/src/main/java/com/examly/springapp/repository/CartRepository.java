package com.examly.springapp.repository;


import org.springframework.data.repository.CrudRepository;
import com.examly.springapp.model.CartModel;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

public interface CartRepository extends CrudRepository<CartModel, Long> {

    //findBy__
    List<CartModel> findAllByUserId(Long userId);

    CartModel findByUserIdAndProductId(Long userId, String productId);

    @Transactional
    void deleteByUserIdAndProductId(Long userId, String productId);

}
