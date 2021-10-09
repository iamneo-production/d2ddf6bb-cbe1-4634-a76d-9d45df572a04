package com.examly.springapp;
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
        //db work;
    }
    public ProductModel getProduct(String id)
    {
       //dbwork
    }
    public String deleteProduct(String id)
    {
        //db -work;
        return "deleted";
    }
    public ProductModel addProduct(ProductModel product)
    {
        //Dbwork;
        
    }


}
