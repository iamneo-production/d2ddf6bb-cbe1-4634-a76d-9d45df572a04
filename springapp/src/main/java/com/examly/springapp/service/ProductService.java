
package com.examly.springapp.service;


import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.examly.springapp.repository.ProductRepository;
import com.examly.springapp.model.ProductModel;
import java.util.*;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<ProductModel> getAllProducts()
    {

        var it = productRepository.findAll();

        var users = new ArrayList<ProductModel>();
        it.forEach(e -> users.add(e));

        return users;

        //db work;

    }
    public ProductModel getProduct(String id)
    {
       //dbwork

       
       ProductModel prod = productRepository.findById(id).get();
       return prod;


    }
    public String deleteProduct(String id)
    {
        //db -work;
        return "deleted";
    }
    public ProductModel addProduct(ProductModel product)
    {

       
        
        productRepository.save(new ProductModel("1234","abcd","vivo","!200","xyz","1"));
        return product;      

        //Dbwork;
        

    }


}
