package com.examly.springapp.Repository;

import org.springframework.data.repository.CrudRepository;

import com.examly.springapp.Models.ProductModel;

public interface ProductRepository extends CrudRepository<ProductModel, Integer> {
    
}
