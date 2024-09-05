package com.paf.fithub.service;

import com.paf.fithub.model.Comment;
import com.paf.fithub.model.Meal;
import com.paf.fithub.model.User;
import com.paf.fithub.dto.CommentDTO;
import com.paf.fithub.dto.MealDTO;
import com.paf.fithub.repository.CommentRepository;
import com.paf.fithub.repository.MealRepository;
import com.paf.fithub.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class MealService {
    @Autowired
    private MealRepository mealRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> getMealById(String id) {
        Optional<Meal> meal = mealRepository.findById(id);
        if (meal.isPresent()) {
            return new ResponseEntity<>(meal.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No Meal Found", HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> getMeals() {
        List<Meal> meals = mealRepository.findAll();

        List<MealDTO> mealDTOList = new ArrayList<>();

        for (Meal meal : meals) {
            MealDTO mealDTO = new MealDTO();
            mealDTO.setId(meal.getId());
            mealDTO.setMealName(meal.getMealName());
            mealDTO.setCategory(meal.getMealCategory());
            mealDTO.setIngredients(meal.getMealIngredients());
            mealDTO.setInstructions(meal.getMealInstructions());
            mealDTO.setImgLink(meal.getImgLink());
            mealDTO.setUpdatedAt(meal.getUpdatedAt());
            mealDTO.setCreatedAt(meal.getCreatedAt());
            mealDTO.setLikedby(meal.getLikedby());
            mealDTO.setUserId(meal.getUserId());

            Optional<User> user = userRepository.findById(meal.getUserId());
            if (user.isPresent()) {
                mealDTO.setUsername(user.get().getUsername());
                mealDTO.setProfileImage(user.get().getProfileImage());
            }

            List<Comment> comments = commentRepository.findByMealId(meal.getId());
            if (comments.size() > 0) {
                List<CommentDTO> commentDTOList = new ArrayList<>();

                for (Comment comment : comments) {
                    CommentDTO commentDTO = new CommentDTO();
                    commentDTO.setId(comment.getId());
                    commentDTO.setText(comment.getText());
                    commentDTO.setMealId(comment.getMealId());
                    commentDTO.setCreatedAt(comment.getCreatedAt());
                    commentDTO.setUpdatedAt(comment.getUpdatedAt());
                    commentDTO.setUserId(comment.getUserId());
                    Optional<User> commentedUser = userRepository.findById(comment.getUserId());
                    if (commentedUser.isPresent()) {
                        commentDTO.setUsername(commentedUser.get().getUsername());
                        commentDTO.setProfileImage(commentedUser.get().getProfileImage());
                    }
                    if (commentedUser.isPresent()) {
                        commentDTOList.add(commentDTO);
                    }

                }

                mealDTO.setComments(commentDTOList);
            }
            if (user.isPresent()) {
                mealDTOList.add(mealDTO);
            }

        }

        return new ResponseEntity<List<MealDTO>>(mealDTOList, HttpStatus.OK);
    }

    public ResponseEntity<?> getMealsByUserId(String userId) {
        List<Meal> meals = mealRepository.findByUserId(userId);
        List<MealDTO> mealDTOList = new ArrayList<>();

        for (Meal meal : meals) {
            MealDTO mealDTO = new MealDTO();
            mealDTO.setId(meal.getId());
            mealDTO.setMealName(meal.getMealName());
            mealDTO.setCategory(meal.getMealCategory());
            mealDTO.setIngredients(meal.getMealIngredients());
            mealDTO.setInstructions(meal.getMealInstructions());
            mealDTO.setImgLink(meal.getImgLink());
            mealDTO.setUpdatedAt(meal.getUpdatedAt());
            mealDTO.setCreatedAt(meal.getCreatedAt());
            mealDTO.setLikedby(meal.getLikedby());
            mealDTO.setUserId(meal.getUserId());

            Optional<User> user = userRepository.findById(meal.getUserId());
            if (user.isPresent()) {
                mealDTO.setUsername(user.get().getUsername());
                mealDTO.setProfileImage(user.get().getProfileImage());
            }

            List<Comment> comments = commentRepository.findByMealId(meal.getId());
            if (comments.size() > 0) {
                List<CommentDTO> commentDTOList = new ArrayList<>();

                for (Comment comment : comments) {
                    CommentDTO commentDTO = new CommentDTO();
                    commentDTO.setId(comment.getId());
                    commentDTO.setText(comment.getText());
                    commentDTO.setMealId(comment.getMealId());
                    commentDTO.setCreatedAt(comment.getCreatedAt());
                    commentDTO.setUpdatedAt(comment.getUpdatedAt());
                    commentDTO.setUserId(comment.getUserId());
                    Optional<User> commentedUser = userRepository.findById(comment.getUserId());
                    if (commentedUser.isPresent()) {
                        commentDTO.setUsername(commentedUser.get().getUsername());
                        commentDTO.setProfileImage(commentedUser.get().getProfileImage());
                    }
                    if (commentedUser.isPresent()) {
                        commentDTOList.add(commentDTO);
                    }

                }

                mealDTO.setComments(commentDTOList);
            }
            if (user.isPresent()) {
                mealDTOList.add(mealDTO);
            }

        }

        return new ResponseEntity<List<MealDTO>>(mealDTOList, HttpStatus.OK);
    }

    public ResponseEntity<?> saveMeal(Meal mealShare) {
        try {
            mealShare.setCreatedAt(new Date(System.currentTimeMillis()));
            mealShare.setUpdatedAt(new Date(System.currentTimeMillis()));
            mealRepository.save(mealShare);
            return new ResponseEntity<Meal>(mealShare, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> updateMealById(String id, Meal meal) {
        Optional<Meal> existingMeal = mealRepository.findById(id);
        if (existingMeal.isPresent()) {
            Meal updateMeal = existingMeal.get();
            if (meal.getMealName() != null) {
                updateMeal.setMealName(meal.getMealName());
            }
            if (meal.getMealCategory() != null) {
                updateMeal.setMealCategory(meal.getMealCategory());
            }
            if (meal.getMealIngredients() != null) {
                updateMeal.setMealIngredients(meal.getMealIngredients());
            }
            if (meal.getMealInstructions() != null) {
                updateMeal.setMealInstructions(meal.getMealIngredients());
            }
            if (meal.getImgLink() != null) {
                updateMeal.setImgLink(meal.getImgLink());
            }
            updateMeal.setUpdatedAt(new Date(System.currentTimeMillis()));
            return new ResponseEntity<>(mealRepository.save(updateMeal), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Meal Update Error", HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> likeMealById(String id, Meal meal) {
        Optional<Meal> existingMeal = mealRepository.findById(id);
        if (existingMeal.isPresent()) {
            Meal updateMeal = existingMeal.get();
            if (meal.getLikedby() != null) {
                updateMeal.setLikedby(meal.getLikedby());
            }
            return new ResponseEntity<>(mealRepository.save(updateMeal), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Meal Update Error", HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> deleteMealById(String id) {
        try {
            mealRepository.deleteById(id);
            return new ResponseEntity<>("Success deleted with " + id, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> getMealsByCategory(String mealCategory) {
        List<Meal> meals = mealRepository.findByMealCategory(mealCategory);

        if (meals.isEmpty()) {
            return new ResponseEntity<>("No meals found for the category: " + mealCategory, HttpStatus.NOT_FOUND);
        }

        List<MealDTO> mealDTOList = new ArrayList<>();
        for (Meal meal : meals) {
            MealDTO mealDTO = new MealDTO();
            // Map meal attributes to mealDTO
            mealDTO.setId(meal.getId());
            mealDTO.setMealName(meal.getMealName());
            mealDTO.setCategory(meal.getMealCategory());
            mealDTO.setIngredients(meal.getMealIngredients());
            mealDTO.setInstructions(meal.getMealInstructions());
            mealDTO.setImgLink(meal.getImgLink());
            mealDTO.setUpdatedAt(meal.getUpdatedAt());
            mealDTO.setCreatedAt(meal.getCreatedAt());
            mealDTO.setLikedby(meal.getLikedby());
            mealDTO.setUserId(meal.getUserId());

            // Populate username and profileImage from the User object (optional)
            Optional<User> user = userRepository.findById(meal.getUserId());
            if (user.isPresent()) {
                mealDTO.setUsername(user.get().getUsername());
                mealDTO.setProfileImage(user.get().getProfileImage());
            }

            mealDTOList.add(mealDTO);
        }

        return new ResponseEntity<>(mealDTOList, HttpStatus.OK);
    }

}
