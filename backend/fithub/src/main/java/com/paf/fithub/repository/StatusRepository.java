package com.paf.fithub.repository;

import com.paf.fithub.model.Status;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StatusRepository extends MongoRepository<Status, String> {
    List<Status> findByUserId(String userId);
}
