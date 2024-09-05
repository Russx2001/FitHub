package com.paf.fithub.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class WorkoutDTO {
    private String id;
    private String userId;
    private String username;
    private String profileImage;
    private List<String> imgLink;
    private String introduction;
    private String overview;
    private String schedule;
    private String safetyTips;
    private Date createdAt;
    private Date updatedAt;
    private List<String> likedby;
    private List<CommentDTO> comments;
}
