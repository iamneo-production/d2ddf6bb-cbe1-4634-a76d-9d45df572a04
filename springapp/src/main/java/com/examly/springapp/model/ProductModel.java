package com.examly.springapp.Models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ProductModel {
    
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private String productId;
    private String imageUrl;
    private String productName;
    private String price;
    private String description;
    private String quantity;

    public String getProductId(){
        return this.productId;
    }
    public String getImageUrl(){
        return this.imageUrl;
    }
    public String getProductName(){
        return this.productName;
    }
    public String getPrice(){
        return this.price;
    }
    public String getDescription(){
        return this.description;
    }
    public String getQuantity(){
        return this.quantity;
    }

    public void setProductId(String productId){
        this.productId = productId;
    }
    public void setImageUrl(String imageUrl){
        this.imageUrl = imageUrl;
    }
    public void setProductName(String productName){
        this.productName = productName;
    }
    public void setPrice(String price){
        this.price = price;
    }
    public void setDescription(String description){
        this.description = description;
    }
    public void setQuantity(String quantity){
        this.quantity = quantity;
    }
    

}
