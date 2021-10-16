package com.examly.springapp.model;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.time.format.DateTimeFormatter;  
import java.time.LocalDateTime;

@Entity
@Table(name = "orderModel")
public class OrderModel{
    
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long orderId;

	
    private Long userId;
    private String productName;
    private int quantity;
    private String totalPrice;
    private String status;
    private String price;
	private String orderedDate;

	public OrderModel(){

	}

	public OrderModel(Long orderId, Long userId, String productName, int quantity, String totalPrice, String status,
			String price, String orderedDate) {
		super();
		this.orderId = orderId;
		this.userId = userId;
		this.productName = productName;
		this.quantity = quantity;
		this.totalPrice = totalPrice;
		this.status = status;
		this.price = price;
		this.orderedDate = orderedDate;
	}

	public OrderModel(Long userId, String productName, int quantity, String price) {
		super();
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");  
   		LocalDateTime now = LocalDateTime.now();
		
		this.userId = userId;
		this.quantity = quantity;
		this.status = "Ordered";
		this.price = price;
		this.totalPrice = Integer.toString(Integer.parseInt(price) * quantity);
		this.productName = productName;
		this.orderedDate = dtf.format(now);
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
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

	public String getOrderedDate() {
		return orderedDate;
	}

	public void setOrderedDate(String orderedDate) {
		this.orderedDate = orderedDate;
	}

	@Override
	public int hashCode() {
		return Objects.hash(orderId, orderedDate, price, productName, quantity, status, totalPrice, userId);
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
		return Objects.equals(orderId, other.orderId) && Objects.equals(orderedDate, other.orderedDate)
				&& Objects.equals(price, other.price) && Objects.equals(productName, other.productName)
				&& quantity == other.quantity && Objects.equals(status, other.status)
				&& Objects.equals(totalPrice, other.totalPrice) && Objects.equals(userId, other.userId);
	}
    
}