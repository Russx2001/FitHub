package com.paf.fithub.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class StatusDTO {
    private String id;
    private String userId;
    private String username;
    private String profileImage;
    private List<String> imgLink;
    private String duration;
    private String type;
    private String targetArea;
    private String intensity;
    private Date createdAt;
    private Date updatedAt;
    private List<String> likedby;
    private List<CommentDTO> comments;
}
