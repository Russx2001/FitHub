import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteWorkoutById,
  updateWorkoutById,
  likeWorkoutById,
  getWorkouts,
  getWorkoutsByUserId,
} from "../../app/actions/workout.actions";
import { getAllUsers } from "../../app/actions/user.actions";

import { saveNotification } from "../../app/actions/notification.action";

import { getWorkoutToShareById } from "../../app/slices/workout.slice";
import { saveComment } from "../../app/actions/comment.actions";
import storage from "../../util/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import UserImage from "../../assets/user.jpeg";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineComment,
  AiFillDelete,
  AiFillEdit,
} from "react-icons/ai";
import { TbShare3 } from "react-icons/tb";
import { GiCancel } from "react-icons/gi";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdSend } from "react-icons/md";
import Comment from "../Comment";
//import ShareWorkoutForm from "../ShareWorkoutForm";
import { Link } from "react-router-dom";
import { getWorkoutShareByUserId } from "../../app/actions/workoutshare.actions";
import FollowButton from "../NewUsersSuggest/FollowButton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

Modal.setAppElement("div");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const getUserByIdFunc = (users, userId) => {
  const result = users.filter(function (el) {
    return el.id === userId;
  });

  return result ? result[0] : null; // or undefined
};


// inside React.useState( ); it is similar to the DTO class in backend
function WorkoutCard({ workout, fetchType }) {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const user = useSelector((state) => state.user);
  const [workoutIntroEdit, setWorkoutIntro] = React.useState(workout.introduction);
  const [workoutOverviewEdit, setWorkoutOverview] = React.useState(workout.overview);
  const [workoutScheduleEdit, setWorkoutSchedule] = React.useState(workout.schedule);
  const [workoutSafetyTipsEdit, setWorkoutSafety] = React.useState(workout.safetyTips);
  const [imgLinkEdit, setImgLinkEdit] = React.useState(workout.imgLink);
  const [comment, setComment] = React.useState("");
  const [isLiked, setIsLiked] = React.useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    if (workout.likedby && workout.likedby.length) {
      const userIdIndex = workout.likedby.indexOf(user.userId);

      if (userIdIndex > -1) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    }
  }, [user]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleSubmitComment = async () => {
    const newComment = {
      workoutId: workout.id,
      userId: user.userId,
      text: comment,
    };
    await dispatch(saveComment(newComment));

    const newNotification = {
      message: "Commented by " + user.user.username + " on your workout",
      userId: workout.userId,
    };

    await dispatch(saveNotification(newNotification));
    if (fetchType === "GET_ALL_WORKOUTS") {
      await dispatch(getWorkouts());
    }
    if (fetchType === "GET_ALL_USER_WORKOUTS") {
      await dispatch(getWorkoutShareByUserId(user.userId));
    }
    if (fetchType === "GET_ALL_WORKOUTS_USER") {
      await dispatch(getWorkoutShareByUserId(workout.userId));
    }
    setComment("");
  };

  const handleSubmit = async () => {
    const newWorkout = {
      id: workout.id,
      userId: user.userId,
      introduction: workoutIntroEdit,
      overview: workoutOverviewEdit,
      schedule: workoutScheduleEdit,
      safetyTips: workoutSafetyTipsEdit,
      imgLink: imgLinkEdit,
    };
    await dispatch(updateWorkoutById(newWorkout));
    if (fetchType === "GET_ALL_WORKOUTS") {
      await dispatch(getWorkouts());
    }
    if (fetchType === "GET_ALL_USER_WORKOUTS") {
      await dispatch(getWorkoutShareByUserId(user.userId));
    }
    if (fetchType === "GET_ALL_USER_WORKOUTS") {
      await dispatch(getWorkoutsByUserId(user.userId));
    }
    setEditable(false);
  };

  const uploadImage = (e) => {
    const files = e.target.files;

    if (files.length === 0) {
      alert("Please upload at least one image!");
      return;
    }

    // upload up to 4 images
    const maxImages = 4;
    const numImages = Math.min(maxImages, files.length);

    for (let i = 0; i < numImages; i++) {
      const file = files[i];
      const storageRef = ref(storage, `/workouts/${file.name}`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (err) => console.log(err),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImgLinkEdit((prevLinks) => [...prevLinks, url]);
          });
        }
      );
    }
  };

  const handleLikeWorkout = async () => {
    const tempLikeArray = workout.likedby ? workout.likedby.slice() : [];
    const userId = user.userId.toString();
    const userIdIndex = tempLikeArray.indexOf(userId);

    if (userIdIndex > -1) {
      tempLikeArray.splice(userIdIndex, 1);
      setIsLiked(false);
    } else {
      tempLikeArray.push(userId);
      setIsLiked(true);
    }

    const likedWorkout = {
      id: workout.id,
      likedby: tempLikeArray,
    };

    await dispatch(likeWorkoutById(likedWorkout));
    if (fetchType === "GET_ALL_WORKOUTS") {
      await dispatch(getWorkouts());
    }
    if (fetchType === "GET_ALL_USER_WORKOUTS") {
      await dispatch(getWorkoutsByUserId(workout.userId));
      await dispatch(getWorkoutShareByUserId(user.userId));
    }
    if (fetchType === "GET_ALL_WORKOUTS_USER") {
      await dispatch(getWorkoutsByUserId(workout.userId));
      await dispatch(getWorkoutShareByUserId(workout.userId));
    }
    const newNotification = {
      message: "Like by " + user.user.username + " on your workout",
      userId: workout.userId,
    };

    await dispatch(saveNotification(newNotification));
  };

  return (
    <div className="card mb-4 workout-card">
      <div className="card-body">
        <div className="row">
          <div className="col-8">
            <Link
              className="text-decoration-none text-dark"
              to={{
                pathname: `/user/${workout.userId}`,
              }}
            >
              <img
                src={workout.profileImage ? workout.profileImage : UserImage}
                className="workout-profile-image img-fluid me-3"
                alt="Profile"
              />
              <span className="text-left">{workout.username} </span>
            </Link>
            <FollowButton
              userDetails={getUserByIdFunc(user.users, workout.userId)}
            />
          </div>
          <div className="col-2"></div>
          {user.userId === workout.userId && (
            <div className="col-2">
              {editable && (
                <>
                  <GiCancel
                    className="react-icons me-3"
                    size={25}
                    onClick={() => {
                      setEditable(false);
                    }}
                  />
                  <IoCheckmarkDoneSharp
                    className="react-icons"
                    size={25}
                    onClick={() => {
                      handleSubmit();
                    }}
                  />
                </>
              )}
              {!editable && (
                <>
                  <AiFillEdit
                    className="react-icons me-3"
                    size={25}
                    onClick={() => {
                      setEditable(true);
                    }}
                  />
                  <AiFillDelete
                    className="react-icons"
                    size={25}
                    onClick={() => {
                      dispatch(deleteWorkoutById(workout.id));
                    }}
                  />
                </>
              )}
            </div>
          )}
        </div>
        <hr />
        <div className="row">
          {!editable && <p >{workout.introduction}</p>}

          {editable && (
            <input
              type="text"
              className="form-control mb-3"
              value={workoutIntroEdit}
              onChange={(e) => setWorkoutIntro(e.target.value)}
            />
          )}
        </div>
        <div className="row">
          <Slider>
            {imgLinkEdit &&
              imgLinkEdit.length &&
              imgLinkEdit.map((imgLink) => (
                <div key={imgLink}>
                  <img
                    src={imgLink}
                    className="card-img-top img-fluid"
                    alt="workoutImages"
                  />
                </div>
              ))}
          </Slider>
          {editable && (
            <input
              type="file"
              className="form-control"
              onChange={(e) => uploadImage(e)}
            />
          )}

          <div className="workout-container">
            {/* Workout Introduction */}
            <div className="workout-item">
              <label className="poppins-semibold">Introduction : </label>
              <p >{!editable && <p>{workout.introduction}</p>}
                {editable && (
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={workoutIntroEdit}
                    onChange={(e) => setWorkoutIntro(e.target.value)}
                  />
                )}</p>
            </div>

            <hr />

            {/*Workout Overview*/}
            <div className="workout-item">
              <label className="poppins-semibold">Workout Overview : </label>
              <p>{!editable && <p>{workout.overview}</p>}
                {editable && (
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={workoutOverviewEdit}
                    onChange={(e) => setWorkoutOverview(e.target.value)}
                  />
                )}</p>
            </div>

            <hr />

            {/* Workout Schedule */}
            <div className="workout-item">
              <label className="poppins-semibold">Schedule : </label>
              <p>{!editable && <p>{workout.schedule}</p>}
                {editable && (
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={workoutScheduleEdit}
                    onChange={(e) => setWorkoutSchedule(e.target.value)}
                  />
                )}</p>
            </div>

            <hr />

            {/* Workout Safety Tips */}
            <div className="workout-item">
              <label className="poppins-semibold">Safety Tips :</label>
              <p>{!editable && <p>{workout.safetyTips}</p>}
                {editable && (
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={workoutSafetyTipsEdit}
                    onChange={(e) => setWorkoutSafety(e.target.value)}
                  />
                )}</p>
            </div>

            <hr />

          </div>
        </div>
        <div className="row text-center container mt-3 mb-3">
          <div className="col-4">
            {isLiked ? (
              <AiFillLike
                className="react-icons me-2"
                size={25}
                onClick={handleLikeWorkout}
              />
            ) : (
              <AiOutlineLike
                className="react-icons me-2"
                size={25}
                onClick={handleLikeWorkout}
              />
            )}

            <span>{workout.likedby ? workout.likedby.length : 0}</span>
          </div>
          <div className="col-4">
            <AiOutlineComment className="react-icons me-2" size={25} />{" "}
            <span>{workout.comments ? workout.comments.length : 0}</span>
          </div>
          <div className="col-4">
            <TbShare3
              className="react-icons"
              size={25}
              onClick={() => {
                dispatch(getWorkoutToShareById(workout.id));
                openModal();
              }}
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-11">
            <input
              type="text"
              className="form-control mb-3"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className="col-1">
            <MdSend
              className="react-icons"
              size={25}
              onClick={() => {
                handleSubmitComment();
              }}
            />
          </div>

          {workout.comments &&
            workout.comments.map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  comment={comment}
                  workoutId={workout.id}
                  workoutUserId={workout.userId}
                  fetchType={fetchType}
                />
              );
            })}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="p-2">
          {/* <ShareWorkoutForm closeModal={closeModal} /> */}
        </div>
      </Modal>
    </div >
  );
}

export default WorkoutCard;
