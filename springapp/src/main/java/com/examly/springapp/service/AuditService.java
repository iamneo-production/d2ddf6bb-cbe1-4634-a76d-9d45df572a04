package com.examly.springapp.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import com.examly.springapp.model.AuditModel;
import com.examly.springapp.repository.AuditRepository;

@Service
public class AuditService {
    @Autowired
    private AuditRepository auditRepository;

    public AuditModel saveAudit(AuditModel audit){                    
        return auditRepository.save(audit);
    }
}