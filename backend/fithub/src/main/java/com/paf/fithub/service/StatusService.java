package com.paf.fithub.service;

import com.paf.fithub.model.Comment;
import com.paf.fithub.model.Status;
import com.paf.fithub.model.User;
import com.paf.fithub.dto.CommentDTO;
import com.paf.fithub.dto.StatusDTO;
import com.paf.fithub.repository.CommentRepository;
import com.paf.fithub.repository.StatusRepository;
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
public class StatusService {
    @Autowired
    private StatusRepository statusRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> getStatusById(String id) {
        Optional<Status> status = statusRepository.findById(id);
        if (status.isPresent()) {
            return new ResponseEntity<>(status.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No Status Found", HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> getStatuses() {
        List<Status> statuses = statusRepository.findAll();

        List<StatusDTO> statusDTOList = new ArrayList<>();

        for (Status status : statuses) {
            StatusDTO statusDTO = new StatusDTO();
            statusDTO.setId(status.getId());
            statusDTO.setDuration(status.getDuration());
            statusDTO.setType(status.getType());
            statusDTO.setTargetArea(status.getTargetArea());
            statusDTO.setIntensity(status.getIntensity());
            statusDTO.setImgLink(status.getImgLink());
            statusDTO.setUpdatedAt(status.getUpdatedAt());
            statusDTO.setCreatedAt(status.getCreatedAt());
            statusDTO.setLikedby(status.getLikedby());
            statusDTO.setUserId(status.getUserId());

            Optional<User> user = userRepository.findById(status.getUserId());
            if (user.isPresent()) {
                statusDTO.setUsername(user.get().getUsername());
                statusDTO.setProfileImage(user.get().getProfileImage());
            }

            List<Comment> comments = commentRepository.findByStatusId(status.getId());
            if (comments.size() > 0) {
                List<CommentDTO> commentDTOList = new ArrayList<>();

                for (Comment comment : comments) {
                    CommentDTO commentDTO = new CommentDTO();
                    commentDTO.setId(comment.getId());
                    commentDTO.setText(comment.getText());
                    commentDTO.setStatusId(comment.getStatusId());
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

                statusDTO.setComments(commentDTOList);
            }
            if (user.isPresent()) {
                statusDTOList.add(statusDTO);
            }

        }

        return new ResponseEntity<List<StatusDTO>>(statusDTOList, HttpStatus.OK);
    }

    public ResponseEntity<?> getStatusesByUserId(String userId) {
        List<Status> statuses = statusRepository.findByUserId(userId);
        List<StatusDTO> statusDTOList = new ArrayList<>();

        for (Status status : statuses) {
            StatusDTO statusDTO = new StatusDTO();
            statusDTO.setId(status.getId());
            statusDTO.setDuration(status.getDuration());
            statusDTO.setType(status.getType());
            statusDTO.setTargetArea(status.getTargetArea());
            statusDTO.setIntensity(status.getIntensity());
            statusDTO.setImgLink(status.getImgLink());
            statusDTO.setUpdatedAt(status.getUpdatedAt());
            statusDTO.setCreatedAt(status.getCreatedAt());
            statusDTO.setLikedby(status.getLikedby());
            statusDTO.setUserId(status.getUserId());

            Optional<User> user = userRepository.findById(status.getUserId());
            if (user.isPresent()) {
                statusDTO.setUsername(user.get().getUsername());
                statusDTO.setProfileImage(user.get().getProfileImage());
            }

            List<Comment> comments = commentRepository.findByStatusId(status.getId());
            if (comments.size() > 0) {
                List<CommentDTO> commentDTOList = new ArrayList<>();

                for (Comment comment : comments) {
                    CommentDTO commentDTO = new CommentDTO();
                    commentDTO.setId(comment.getId());
                    commentDTO.setText(comment.getText());
                    commentDTO.setStatusId(comment.getStatusId());
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

                statusDTO.setComments(commentDTOList);
            }
            if (user.isPresent()) {
                statusDTOList.add(statusDTO);
            }

        }

        return new ResponseEntity<List<StatusDTO>>(statusDTOList, HttpStatus.OK);
    }

    public ResponseEntity<?> saveStatus(Status statusShare) {
        try {
            statusShare.setCreatedAt(new Date(System.currentTimeMillis()));
            statusShare.setUpdatedAt(new Date(System.currentTimeMillis()));
            statusRepository.save(statusShare);
            return new ResponseEntity<Status>(statusShare, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> updateStatusById(String id, Status status) {
        Optional<Status> existingStatus = statusRepository.findById(id);
        if (existingStatus.isPresent()) {
            Status updateStatus = existingStatus.get();
            if (status.getDuration() != null) {
                updateStatus.setDuration(status.getDuration());
            }
            if (status.getType() != null) {
                updateStatus.setType(status.getType());
            }
            if (status.getTargetArea() != null) {
                updateStatus.setTargetArea(status.getTargetArea());
            }
            if (status.getIntensity() != null) {
                updateStatus.setIntensity(status.getIntensity());
            }
            if (status.getImgLink() != null) {
                updateStatus.setImgLink(status.getImgLink());
            }
            updateStatus.setUpdatedAt(new Date(System.currentTimeMillis()));
            return new ResponseEntity<>(statusRepository.save(updateStatus), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Status Update Error", HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> likeStatusById(String id, Status status) {
        Optional<Status> existingStatus = statusRepository.findById(id);
        if (existingStatus.isPresent()) {
            Status updateStatus = existingStatus.get();
            if (status.getLikedby() != null) {
                updateStatus.setLikedby(status.getLikedby());
            }
            return new ResponseEntity<>(statusRepository.save(updateStatus), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Status Update Error", HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> deleteStatusById(String id) {
        try {
            statusRepository.deleteById(id);
            return new ResponseEntity<>("Success deleted with " + id, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
