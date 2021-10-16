package com.examly.springapp.model;

import java.util.Objects;
import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Column;


@Entity
@Table(name = "productModel")
public class ProductModel {
    
    @Id
    private String productId = UUID.randomUUID().toString();
    private String imageUrl;
    private String productName;
    private String price;
	@Lob
    @Column
    private String description;
    private String quantity;
	private String manufacturedDate;

	public ProductModel(){
		
	}
	

	public ProductModel(String imageUrl, String productName, String price, String description,
			String quantity, String manufacturedDate) {
		super();
		this.imageUrl = imageUrl;
		this.productName = productName;
		this.price = price;
		this.description = description;
		this.quantity = quantity;
		this.manufacturedDate = manufacturedDate;
	}


	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public String getManufacturedDate() {
		return manufacturedDate;
	}

	public void setManufacturedDate(String manufacturedDate) {
		this.manufacturedDate = manufacturedDate;
	}


	@Override
	public int hashCode() {
		return Objects.hash(description, imageUrl, manufacturedDate, price, productId, productName, quantity);
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ProductModel other = (ProductModel) obj;
		return Objects.equals(description, other.description) && Objects.equals(imageUrl, other.imageUrl)
				&& Objects.equals(manufacturedDate, other.manufacturedDate) && Objects.equals(price, other.price)
				&& Objects.equals(productId, other.productId) && Objects.equals(productName, other.productName)
				&& Objects.equals(quantity, other.quantity);
	}
	
}