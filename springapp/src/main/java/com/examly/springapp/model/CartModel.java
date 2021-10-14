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
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long cartItemId;

    private Long userId;
	private String productId;
    private String productName;
    private int quantity;
    private String price;
    
    public CartModel(){
        
    }

	public CartModel(Long cartItemId, Long userId, String productId, String productName, int quantity, String price) {
		super();
		this.cartItemId = cartItemId;
		this.userId = userId;
		this.productId = productId;
		this.productName = productName;
		this.quantity = quantity;
		this.price = price;
	}
	
	public Long getCartItemId() {
		return cartItemId;
	}
	public void setCartItemId(Long cartItemId) {
		this.cartItemId = cartItemId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public String getProductId(){
		return productId;
	}
	public void setProductId(String productId){
		this.productId = productId;
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