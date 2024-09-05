package com.paf.fithub.dto;

import lombok.Data;

import java.util.Date;

@Data
public class CommentDTO {
    private String id;
    private String text;
    private String userId;
    private String username;
    private String profileImage;
    private String postId;
    private String mealId;
    private String statusId;
    private String workoutId;
    private Date createdAt;
    private Date updatedAt;
}
