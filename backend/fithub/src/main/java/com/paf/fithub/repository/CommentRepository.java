package com.paf.fithub.repository;

import com.paf.fithub.model.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {
    List<Comment> findByPostId(String postId);

    List<Comment> findByMealId(String mealId);

    List<Comment> findByWorkoutId(String workoutId);

    List<Comment> findByStatusId(String statusId);

}