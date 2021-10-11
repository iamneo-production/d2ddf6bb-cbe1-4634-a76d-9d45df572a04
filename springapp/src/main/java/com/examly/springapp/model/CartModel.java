package com.examly.springapp.model;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
@Table(name = "cartModel")
public class CartModel{

    @Id
    private String cartItemId;
    private String userId;
    private String productName;
    private int quantity;
    private String price;
    
    public CartModel(){
        
    }

	public CartModel(String cartItemId, String userId, String productName, int quantity, String price) {
		super();
		this.cartItemId = cartItemId;
		this.userId = userId;
		this.productName = productName;
		this.quantity = quantity;
		this.price = price;
	}
	
	public String getCartItemId() {
		return cartItemId;
	}
	public void setCartItemId(String cartItemId) {
		this.cartItemId = cartItemId;
	}
	public String getuserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	@Override
	public int hashCode() {
		return Objects.hash(cartItemId, price, productName, quantity);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		CartModel other = (CartModel) obj;
		return Objects.equals(cartItemId, other.cartItemId) && Objects.equals(price, other.price)
				&& Objects.equals(productName, other.productName) && quantity == other.quantity;
	}
    
}