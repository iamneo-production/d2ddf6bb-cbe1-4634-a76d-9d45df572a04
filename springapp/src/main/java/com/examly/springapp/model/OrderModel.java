package com.examly.springapp.model;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
@Table(name = "orderModel")
public class OrderModel implements Serializable{
    
    @Id
    private String orderId;

	@ManyToOne(targetEntity = UserModel.class)
    private String userId;
    private String productName;
    private int quantity;
    private String totalPrice;
    private String status;
    private String price;
    
    public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public String getUserId() {
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
	public String getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(String totalPrice) {
		this.totalPrice = totalPrice;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
    @Override
	public int hashCode() {
		return Objects.hash(orderId, price, productName, quantity, status, totalPrice, userId);
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		OrderModel other = (OrderModel) obj;
		return Objects.equals(orderId, other.orderId) && Objects.equals(price, other.price)
				&& Objects.equals(productName, other.productName) && quantity == other.quantity
				&& Objects.equals(status, other.status) && Objects.equals(totalPrice, other.totalPrice)
				&& Objects.equals(userId, other.userId);
	}

}
