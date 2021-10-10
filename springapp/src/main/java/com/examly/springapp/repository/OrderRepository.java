package com.examly.springapp.repository;

import org.springframework.data.repository.CrudRepository;
import com.examly.springapp.model.OrderModel;
import java.util.List;

public interface OrderRepository extends CrudRepository<OrderModel, String> {
    
    List<OrderModel> findAllByUserId(String id);
}