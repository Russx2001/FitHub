package com.paf.fithub.service;

import com.paf.fithub.model.Comment;
import com.paf.fithub.model.Workout;
import com.paf.fithub.model.User;
import com.paf.fithub.dto.CommentDTO;
import com.paf.fithub.dto.WorkoutDTO;
import com.paf.fithub.repository.CommentRepository;
import com.paf.fithub.repository.WorkoutRepository;
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
public class WorkoutService {
    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    public ResponseEntity<?> getWorkoutById(String id) {
        Optional<Workout> workout = workoutRepository.findById(id);
        if (workout.isPresent()) {
            return new ResponseEntity<>(workout.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No Workout Found", HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> getWorkouts() {
        List<Workout> workouts = workoutRepository.findAll();

        List<WorkoutDTO> workoutDTOList = new ArrayList<>();

        for (Workout workout : workouts) {
            WorkoutDTO workoutDTO = new WorkoutDTO();
            workoutDTO.setId(workout.getId());
            workoutDTO.setIntroduction(workout.getIntroduction());
            workoutDTO.setOverview(workout.getOverview());
            workoutDTO.setSchedule(workout.getSchedule());
            workoutDTO.setSafetyTips(workout.getSafetyTips());
            workoutDTO.setImgLink(workout.getImgLink());
            workoutDTO.setUpdatedAt(workout.getUpdatedAt());
            workoutDTO.setCreatedAt(workout.getCreatedAt());
            workoutDTO.setLikedby(workout.getLikedby());
            workoutDTO.setUserId(workout.getUserId());

            System.out.println("Checking the workout :" + workoutDTO); // Check whether data is passing to the
                                                                       // model

            Optional<User> user = userRepository.findById(workout.getUserId());
            if (user.isPresent()) {
                workoutDTO.setUsername(user.get().getUsername());
                workoutDTO.setProfileImage(user.get().getProfileImage());
            }

            List<Comment> comments = commentRepository.findByWorkoutId(workout.getId());
            if (comments.size() > 0) {
                List<CommentDTO> commentDTOList = new ArrayList<>();

                for (Comment comment : comments) {
                    CommentDTO commentDTO = new CommentDTO();
                    commentDTO.setId(comment.getId());
                    commentDTO.setText(comment.getText());
                    commentDTO.setWorkoutId(comment.getWorkoutId());
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

                workoutDTO.setComments(commentDTOList);
            }
            if (user.isPresent()) {
                workoutDTOList.add(workoutDTO);
            }

        }

        return new ResponseEntity<List<WorkoutDTO>>(workoutDTOList, HttpStatus.OK);
    }

    public ResponseEntity<?> getWorkoutsByUserId(String userId) {
        List<Workout> workouts = workoutRepository.findByUserId(userId);
        List<WorkoutDTO> workoutDTOList = new ArrayList<>();

        for (Workout workout : workouts) {
            WorkoutDTO workoutDTO = new WorkoutDTO();
            workoutDTO.setId(workout.getId());
            workoutDTO.setIntroduction(workout.getIntroduction());
            workoutDTO.setOverview(workout.getOverview());
            workoutDTO.setSchedule(workout.getSchedule());
            workoutDTO.setSafetyTips(workout.getSafetyTips());
            workoutDTO.setImgLink(workout.getImgLink());
            workoutDTO.setUpdatedAt(workout.getUpdatedAt());
            workoutDTO.setCreatedAt(workout.getCreatedAt());
            workoutDTO.setLikedby(workout.getLikedby());
            workoutDTO.setUserId(workout.getUserId());

            System.out.println("Checking the meal :" + workoutDTO);

            Optional<User> user = userRepository.findById(workout.getUserId());
            if (user.isPresent()) {
                workoutDTO.setUsername(user.get().getUsername());
                workoutDTO.setProfileImage(user.get().getProfileImage());
            }

            List<Comment> comments = commentRepository.findByWorkoutId(workout.getId());
            if (comments.size() > 0) {
                List<CommentDTO> commentDTOList = new ArrayList<>();

                for (Comment comment : comments) {
                    CommentDTO commentDTO = new CommentDTO();
                    commentDTO.setId(comment.getId());
                    commentDTO.setText(comment.getText());
                    commentDTO.setWorkoutId(comment.getWorkoutId());
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

                workoutDTO.setComments(commentDTOList);
            }
            if (user.isPresent()) {
                workoutDTOList.add(workoutDTO);
            }
        }

        return new ResponseEntity<List<WorkoutDTO>>(workoutDTOList, HttpStatus.OK);
    }

    public ResponseEntity<?> saveWorkout(Workout workoutShare) {
        try {
            workoutShare.setCreatedAt(new Date(System.currentTimeMillis()));
            workoutShare.setUpdatedAt(new Date(System.currentTimeMillis()));
            workoutRepository.save(workoutShare);
            return new ResponseEntity<Workout>(workoutShare, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<?> updateWorkoutById(String id, Workout workout) {
        Optional<Workout> existingWorkout = workoutRepository.findById(id);
        if (existingWorkout.isPresent()) {
            Workout updateWorkout = existingWorkout.get();
            if (workout.getIntroduction() != null) {
                updateWorkout.setIntroduction(workout.getIntroduction());
            }
            if (workout.getOverview() != null) {
                updateWorkout.setOverview(workout.getOverview());
            }
            if (workout.getSchedule() != null) {
                updateWorkout.setSchedule(workout.getSchedule());
            }
            if (workout.getSchedule() != null) {
                updateWorkout.setSchedule(workout.getSchedule());
            }
            if (workout.getImgLink() != null) {
                updateWorkout.setImgLink(workout.getImgLink());
            }
            updateWorkout.setUpdatedAt(new Date(System.currentTimeMillis()));
            return new ResponseEntity<>(workoutRepository.save(updateWorkout), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Workout Update Error", HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> likeWorkoutById(String id, Workout workout) {
        Optional<Workout> existingWorkout = workoutRepository.findById(id);
        if (existingWorkout.isPresent()) {
            Workout updateWorkout = existingWorkout.get();
            if (workout.getLikedby() != null) {
                updateWorkout.setLikedby(workout.getLikedby());
            }
            return new ResponseEntity<>(workoutRepository.save(updateWorkout), HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Workout Update Error", HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<?> deleteWorkoutById(String id) {
        try {
            workoutRepository.deleteById(id);
            return new ResponseEntity<>("Success deleted with " + id, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
