package com.examly.springapp.controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import com.examly.springapp.service.ProductService;
import com.examly.springapp.service.AuditService;
import com.examly.springapp.model.ProductModel;
import com.examly.springapp.model.UserModel;
import com.examly.springapp.model.AuditModel;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import java.util.List;



@RestController
public class ProductController {

    @Autowired
    private ProductService productService;
    @Autowired
    private AuditService auditService;

    //----------------- user- routes ---------------------;

    @RequestMapping("/home")
    public List<ProductModel>  getAllProducts()
    {
        return productService.getAllProducts();
    }

    @RequestMapping("/product/{id}")
    public ProductModel getProduct(@PathVariable String id)
    {
        return productService.getProduct(id);

    }
    //-------------------  admin-routes ---------------------

    @PostMapping("/admin/addProduct")
    public ProductModel addProduct(@AuthenticationPrincipal UserModel user, @RequestBody ProductModel newProduct)
    {  
        ProductModel product = productService.addProduct(newProduct);

        this.auditService.saveAudit(new AuditModel(user.getId(), "Admin added a new Product with ID: " + product.getProductId()));
        return product;
    }

    @RequestMapping("/admin/delete/{id}")
    public String deleteProduct(@PathVariable String id)
    {
        return productService.deleteProduct(id);
    }

    @PostMapping("/admin/productEdit/{id}")
    public ProductModel editProduct(@RequestBody ProductModel editedProduct,@PathVariable String id)
    {
        ProductModel product = productService.getProduct(id);
        return productService.editProduct(product,editedProduct); 
        
    }

    @RequestMapping("/admin/productEdit/{id}")
    public ProductModel productEditSave(@PathVariable String id)
    {
        return productService.getProduct(id);
    }

}
