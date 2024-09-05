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
@Document(collection = "statuses")
public class Status {
    @Id
    private String id;
    private String userId;
    private String username;
    private List<String> imgLink;
    private String duration;
    private String type;
    private String targetArea;
    private String intensity;
    private List<String> likedby;
    private Date createdAt;
    private Date updatedAt;
}