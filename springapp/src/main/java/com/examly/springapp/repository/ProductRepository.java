package com.examly.springapp;

import org.springframework.data.repository.CrudRepository;

import com.examly.springapp.model.ProductModel;

public interface ProductRepository extends CrudRepository<ProductModel, Integer> {
    
}
