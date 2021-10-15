package com.examly.springapp.controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import com.examly.springapp.service.ProductService;
import com.examly.springapp.service.AuditService;
import com.examly.springapp.model.ProductModel;
import com.examly.springapp.model.UserModel;
import com.examly.springapp.model.AuditModel;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import java.util.List;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.BadCredentialsException;
import java.lang.*;



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
    public ResponseEntity<String> addProduct(@AuthenticationPrincipal UserModel user, @RequestBody ProductModel newProduct)
    {  
        try
        {
            String role = user.getRole();
            if(role.equals("User"))
            {   
                throw new Exception("UnAuthorized access..");
            }
            else
            {
                ProductModel product = productService.addProduct(newProduct);
                this.auditService.saveAudit(new AuditModel(user.getId(), "Admin added a new Product with ID: " + product.getProductId()));
                return ResponseEntity.ok()
                .header("Product added sucessfully..")
                .body("true");
            }
            
        }
        catch (Exception ex) {
            return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .header("something went wrong... Please try again")
                .body("false");
        }

    }

    @RequestMapping("/admin/delete/{id}")
    public ResponseEntity<String>  deleteProduct(@AuthenticationPrincipal UserModel user, @PathVariable String id)
    {
        try
        {
            if(user.getRole().equals("User"))
            {
               throw new Exception("UnAuthorized Access");
            }
            else
            {
                 productService.deleteProduct(id);
                 this.auditService.saveAudit(new AuditModel(user.getId(), "Admin deleted a Product with ID: " + id));
                 return ResponseEntity.ok()
                 .header("Product deleted..")
                 .body("true");

            }
        }
        catch(Exception e)
        {
            return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .header("something went wrong... Please try again")
            .body("false");
        }
    }

    @PostMapping("/admin/productEdit/{id}")
    public ResponseEntity<String> editProduct(@AuthenticationPrincipal UserModel user, @RequestBody ProductModel editedProduct,@PathVariable String id)
    {

        try
        {
            if(user.getRole().equals("User"))
            {
                throw new Exception("UnAuthorized access");
            }
            else
            {
                System.out.println("inside");
                ProductModel product = productService.getProduct(id);
                productService.editProduct(product,editedProduct);
                this.auditService.saveAudit(new AuditModel(user.getId(), "Admin edited the Product with ID: " + id));
                return ResponseEntity.ok()
                .header("Product edited..")
                .body("true");

            }
        }
        catch(Exception e)
        {
            return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .header("something went wrong... Please try again")
            .body("false");
        }
    }

    @RequestMapping("/admin/productEdit/{id}")
    public ProductModel productEditSave(@PathVariable String id)
    {
        return productService.getProduct(id);
    }

}
