package com.examly.springapp.model;

import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Lob;
import javax.persistence.Column;
import java.time.format.DateTimeFormatter;  
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "paymentModel")
public class PaymentModel{

    @Id
    private String razorPayOrderId;
    private String razorPayPaymentId;
    private String razorPaySignature;
    private Long orderId;
    private Long userId;
    
    public PaymentModel() {
        
    }

	public PaymentModel(String razorPayOrderId, Long orderId, Long userId) {
		super();
   		this.razorPayOrderId = razorPayOrderId;
        this.orderId = orderId;
		this.userId = userId;
	}

    public Long getOrderId() {
        return this.orderId;
    }

    public void setPaymentId(String paymentId) {
        this.razorPayPaymentId = paymentId;
    }

    public void setSignature(String sign) {
        this.razorPaySignature = sign;
    }

	@Override
	public int hashCode() {
		return Objects.hash(this.razorPayOrderId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		PaymentModel other = (PaymentModel) obj;
        
        return Objects.equals(this.razorPayOrderId, other.razorPayOrderId);
	}
    
}