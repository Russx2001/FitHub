package com.paf.fithub.repository;

import com.paf.fithub.model.Meal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealRepository extends MongoRepository<Meal, String> {
    List<Meal> findByUserId(String userId);

    List<Meal> findByMealCategory(String mealCategory);
}
