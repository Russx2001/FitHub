package com.paf.fithub.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "meals")
public class Meal {
    @Id
    private String id;
    private String userId;
    private String username;
    private List<String> imgLink;
    private String mealName;
    private String mealCategory;
    private String mealIngredients;
    private String mealInstructions;
    private List<String> likedby;
    private Date createdAt;
    private Date updatedAt;
}