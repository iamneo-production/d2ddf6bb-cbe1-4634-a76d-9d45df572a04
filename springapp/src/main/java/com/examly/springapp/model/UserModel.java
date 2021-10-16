package com.examly.springapp.model;

import java.util.Objects;
import java.util.List;

import com.examly.springapp.model.CartModel;
import com.examly.springapp.model.OrderModel;
import com.examly.springapp.encryption.Crypto;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.JoinColumn;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.GrantedAuthority;



@Entity
@Table(name = "userModel")
public class UserModel implements UserDetails {
    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long userId;
    private String email;
    private String password;
    private String username;
    private String mobileNumber;
    private Boolean active;
	private Boolean verified;
    private String role;
	private boolean enabled = true;
	private String emailVerificationCode;
	@OneToMany(mappedBy = "userId")
	private List<CartModel> cart;
	
	@OneToMany(mappedBy = "userId")
	private List<OrderModel> orderList;

	public UserModel(){
		
	}

	public UserModel(Long userId, String email, String password, String username, String mobileNumber, Boolean active,
			String role, List<CartModel> cart, List<OrderModel> orderList, Boolean verified) {
		super();
		this.userId = userId;
		this.email = email;
		this.password = password;
		this.username = username;
		this.mobileNumber = Crypto.encrypt(mobileNumber);
		this.active = active;
		this.role = role;
		this.cart = cart;
		this.orderList = orderList;
		this.verified = verified;
	}

	public UserModel(String email, String password, String username, String mobileNumber, String emailVerificationCode) {
		super();
		this.email = email;
		this.password = password;
		this.username = username;
		this.mobileNumber = Crypto.encrypt(mobileNumber);
		this.active = true;
		this.role = "User";
		this.verified = false;
		this.emailVerificationCode = emailVerificationCode;
	}

	public Long getId() {
		return userId;
	}

	public void setId(Long userId){
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

	public Boolean getVerified(){
		return verified;
	}
	public void setVerified(Boolean verified){
		this.verified = verified;
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

	
	public String getEmailVerificationCode() {
		return this.emailVerificationCode;
	}

	public void setEmailVerificationCode(String code) {
		this.emailVerificationCode = code;
	}

	@Override
    public boolean isAccountNonExpired() {
        return enabled;
    }

    @Override
    public boolean isAccountNonLocked() {
        return enabled;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return enabled;
    }

	@Override
    public boolean isEnabled() {
        return enabled;
    }

	@Override
	public List<GrantedAuthority> getAuthorities() {
		return List.of();
	}

	@Override
	public int hashCode() {
		return Objects.hash(active, email, mobileNumber, password, role, username);
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
		return Objects.equals(active, other.active) 
				&& Objects.equals(email, other.email)
				&& Objects.equals(mobileNumber, other.mobileNumber) 
				&& Objects.equals(password, other.password) 
				&& Objects.equals(role, other.role)
				&& Objects.equals(username, other.username);
	}
	
}