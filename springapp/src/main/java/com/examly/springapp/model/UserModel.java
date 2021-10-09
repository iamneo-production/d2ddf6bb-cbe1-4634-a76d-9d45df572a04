package com.examly.springapp.model;

import java.util.Objects;
import java.util.List;

import com.examly.springapp.model.CartModel;
import com.examly.springapp.model.OrderModel;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.JoinColumn;


@Entity
@Table(name = "userModel")
public class UserModel {
    @Id
	private String userId;
    private String email;
    private String password;
    private String username;
    private String mobileNumber;
    private Boolean active;
    private String role;
	@OneToMany(mappedBy = "userId")
	private List<CartModel> cart;
	
	@OneToMany(mappedBy = "userId")
	private List<OrderModel> orderList;

	public UserModel(){
		
	}

	public UserModel(String userId, String email, String password, String username, String mobileNumber, Boolean active,
			String role, List<CartModel> cart, List<OrderModel> orderList) {
		super();
		this.userId = userId;
		this.email = email;
		this.password = password;
		this.username = username;
		this.mobileNumber = mobileNumber;
		this.active = active;
		this.role = role;
		this.cart = cart;
		this.orderList = orderList;
	}

	public String getId() {
		return userId;
	}

	public void setId(String userId) {
		this.userId = userId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public List<CartModel> getCart() {
		return cart;
	}

	public void setCart(List<CartModel> cart) {
		this.cart = cart;
	}

	public List<OrderModel> getOrderList() {
		return orderList;
	}

	public void setOrderList(List<OrderModel> orderList) {
		this.orderList = orderList;
	}

	@Override
	public int hashCode() {
		return Objects.hash(active, email, userId, mobileNumber, password, role, username);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserModel other = (UserModel) obj;
		return Objects.equals(active, other.active) && Objects.equals(email, other.email)
				&& Objects.equals(userId, other.userId) && Objects.equals(mobileNumber, other.mobileNumber)
				&& Objects.equals(password, other.password) && Objects.equals(role, other.role)
				&& Objects.equals(username, other.username);
	}
	
}