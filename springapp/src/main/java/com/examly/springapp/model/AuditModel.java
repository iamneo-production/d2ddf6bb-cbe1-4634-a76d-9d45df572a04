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

@Entity
@Table(name = "auditModel")
public class AuditModel{

    @Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long auditId;
    private Long userId;
	@Lob
    @Column
    private String action;
	@Lob
    @Column
    private String createdAt;
    
    public AuditModel() {
        
    }

	public AuditModel(Long userId, String action) {
		super();
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");  
   		LocalDateTime now = LocalDateTime.now();  
   		
		this.userId = userId;
        this.action = action;
        this.createdAt = dtf.format(now);
	}

	@Override
	public int hashCode() {
		return Objects.hash(auditId);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		AuditModel other = (AuditModel) obj;
        
        return Objects.equals(this.auditId, other.auditId);
	}
    
}