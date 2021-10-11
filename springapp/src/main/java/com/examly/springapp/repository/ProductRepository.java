package com.examly.springapp.repository;

// import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.ProductModel;

public interface ProductRepository extends JpaRepository<ProductModel,java.lang.String> {
   
    
}
