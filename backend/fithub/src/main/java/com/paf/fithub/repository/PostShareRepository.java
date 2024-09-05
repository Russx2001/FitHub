package com.paf.fithub.repository;

import com.paf.fithub.model.PostShare;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostShareRepository extends MongoRepository<PostShare, String> {
    List<PostShare> findByUserId(String userId);
}
