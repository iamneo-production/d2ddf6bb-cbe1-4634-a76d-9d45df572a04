package com.examly.springapp.repository;


import org.springframework.data.repository.CrudRepository;
import com.examly.springapp.model.AuditModel;
import java.util.List;

public interface AuditRepository extends CrudRepository<AuditModel, Long> {

    //findBy__
    List<AuditModel> findAllByUserId(Long userId);


}
