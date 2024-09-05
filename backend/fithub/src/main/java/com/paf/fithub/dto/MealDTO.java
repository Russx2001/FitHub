package com.paf.fithub.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class MealDTO {
    private String id;
    private String userId;
    private String username;
    private String profileImage;
    private List<String> imgLink;
    private String mealName;
    private String category;
    private String ingredients;
    private String instructions;
    private Date createdAt;
    private Date updatedAt;
    private List<String> likedby;
    private List<CommentDTO> comments;
}
