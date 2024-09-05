package com.paf.fithub.controller;

import com.paf.fithub.model.Meal;
import com.paf.fithub.service.MealService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/meals")
public class MealController {
    @Autowired
    private MealService mealService;

    @PostMapping
    public ResponseEntity<?> saveMeal(@RequestBody Meal meal) {
        return mealService.saveMeal(meal);
    }

    @GetMapping
    public ResponseEntity<?> getMeals() {
        return mealService.getMeals();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getMealsByUserId(@PathVariable String id) {
        return mealService.getMealsByUserId(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMealById(@PathVariable String id) {
        return mealService.getMealById(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateMealById(@PathVariable String id, @RequestBody Meal meal) {
        return mealService.updateMealById(id, meal);
    }

    @PutMapping("/like/{id}")
    public ResponseEntity<?> likeMealById(@PathVariable String id, @RequestBody Meal meal) {
        return mealService.likeMealById(id, meal);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMealById(@PathVariable String id) {
        return mealService.deleteMealById(id);
    }

    @GetMapping("/category/{mealCategory}")
    public ResponseEntity<?> getMealsByCategory(@PathVariable String mealCategory) {
        return mealService.getMealsByCategory(mealCategory);
    }

}
