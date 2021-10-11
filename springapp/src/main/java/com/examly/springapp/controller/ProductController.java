package com.examly.springapp.controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import com.examly.springapp.service.ProductService;
import com.examly.springapp.model.ProductModel;
import java.util.List;



@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @RequestMapping("/products")
    public List<ProductModel>  getAllProducts()
    {
        return productService.getAllProducts();
    }

    @RequestMapping("/product/{id}")
    public ProductModel getProduct(@PathVariable String id)
    {
        
        return productService.getProduct(id);
    }

    @PostMapping("/addProduct")
    public ProductModel addProduct(@RequestBody ProductModel newProduct)
    {   System.out.println(newProduct);
        return productService.addProduct(newProduct);
    }

    @RequestMapping("/product/delete/{id}")
    public String deleteProduct(@PathVariable String id)
    {
        return productService.deleteProduct(id);
    }

}
