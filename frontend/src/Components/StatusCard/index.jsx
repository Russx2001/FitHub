import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStatusById,
  updateStatusById,
  likeStatusById,
  getStatuses,
  getStatusesByUserId,
} from "../../app/actions/status.actions";
import { getAllUsers } from "../../app/actions/user.actions";

import { saveNotification } from "../../app/actions/notification.action";

import { getStatusToShareById } from "../../app/slices/status.slice";
import { saveComment } from "../../app/actions/comment.actions";
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
//import ShareStatusForm from "../ShareStatusForm";
import { Link } from "react-router-dom";
import { getStatusShareByUserId } from "../../app/actions/statusshare.actions";
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
function StatusCard({ status, fetchType }) {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const user = useSelector((state) => state.user);
  const [durationEdit, setStatusDuration] = React.useState(status.duration);
  const [typeEdit, setStatusType] = React.useState(status.category);
  const [targetAreaEdit, setStatusTargetArea] = React.useState(status.ingredients);
  const [intensityEdit, setStatusIntensity] = React.useState(status.intensity);
  const [comment, setComment] = React.useState("");
  const [isLiked, setIsLiked] = React.useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    if (status.likedby && status.likedby.length) {
      const userIdIndex = status.likedby.indexOf(user.userId);

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
      statusId: status.id,
      userId: user.userId,
      text: comment,
    };
    await dispatch(saveComment(newComment));

    const newNotification = {
      message: "Commented by " + user.user.username + " on your status",
      userId: status.userId,
    };

    await dispatch(saveNotification(newNotification));
    if (fetchType === "GET_ALL_STATUSES") {
      await dispatch(getStatuses());
    }
    if (fetchType === "GET_ALL_USER_STATUSES") {
      await dispatch(getStatusShareByUserId(user.userId));
    }
    if (fetchType === "GET_ALL_STATUSES_USER") {
      await dispatch(getStatusShareByUserId(status.userId));
    }
    setComment("");
  };

  const handleSubmit = async () => {
    const newStatus = {
      id: status.id,
      userId: user.userId,
      duration: durationEdit,
      type: typeEdit,
      targetArea: targetAreaEdit,
      intensity: intensityEdit,
    };
    await dispatch(updateStatusById(newStatus));
    if (fetchType === "GET_ALL_STATUSES") {
      await dispatch(getStatuses());
    }
    if (fetchType === "GET_ALL_USER_STATUSES") {
      await dispatch(getStatusShareByUserId(user.userId));
    }
    if (fetchType === "GET_ALL_USER_STATUSES") {
      await dispatch(getStatusesByUserId(user.userId));
    }
    setEditable(false);
  };

  const handleLikeStatus = async () => {
    const tempLikeArray = status.likedby ? status.likedby.slice() : [];
    const userId = user.userId.toString();
    const userIdIndex = tempLikeArray.indexOf(userId);

    if (userIdIndex > -1) {
      tempLikeArray.splice(userIdIndex, 1);
      setIsLiked(false);
    } else {
      tempLikeArray.push(userId);
      setIsLiked(true);
    }

    const likedStatus = {
      id: status.id,
      likedby: tempLikeArray,
    };

    await dispatch(likeStatusById(likedStatus));
    if (fetchType === "GET_ALL_STATUSES") {
      await dispatch(getStatuses());
    }
    if (fetchType === "GET_ALL_USER_STATUSES") {
      await dispatch(getStatusesByUserId(status.userId));
      await dispatch(getStatusShareByUserId(user.userId));
    }
    if (fetchType === "GET_ALL_STATUSES_USER") {
      await dispatch(getStatusesByUserId(status.userId));
      await dispatch(getStatusShareByUserId(status.userId));
    }
    const newNotification = {
      message: "Like by " + user.user.username + " on your status",
      userId: status.userId,
    };

    await dispatch(saveNotification(newNotification));
  };

  return (
    <div className="card mb-4 status-card">
      <div className="card-body">
        <div className="row">
          <div className="col-8">
            <Link
              className="text-decoration-none text-dark"
              to={{
                pathname: `/user/${status.userId}`,
              }}
            >
              <img
                src={status.profileImage ? status.profileImage : UserImage}
                className="status-profile-image img-fluid me-3"
                alt="Profile"
              />
              <span className="text-left">{status.username} </span>
            </Link>
            <FollowButton
              userDetails={getUserByIdFunc(user.users, status.userId)}
            />
          </div>
          <div className="col-2"></div>
          {user.userId === status.userId && (
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
                      dispatch(deleteStatusById(status.id));
                    }}
                  />
                </>
              )}
            </div>
          )}
        </div>
        <hr />
        {/* #F7DC6F #1ABC9C #2C3E50 #8E44AD */}
        <div className="status-container row fs-5 text-center text-white">
          {/* Status Duration */}
          <div className="row mb-3">
            <div className="status-item col bg-color-1">
              <p>Duration : {!editable && <span>{status.duration} mins</span>}
                {editable && (
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={durationEdit}
                    onChange={(e) => setStatusDuration(e.target.value)}
                  />
                )}
              </p>
            </div>

            {/* Status type */}
            <div className="status-item col bg-color-2">
              <p>Type : {!editable && <span>{status.type}</span>}
                {editable && (
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={typeEdit}
                    onChange={(e) => setStatusType(e.target.value)}
                  />
                )}
              </p>
            </div>
          </div>

          {/* Status plan ingredients */}
          <div className="row">
            <div className="status-item col bg-color-3">
              <p>Target Area :{!editable && <span>{` ${status.targetArea}`}</span>}
                {editable && (
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={targetAreaEdit}
                    onChange={(e) => setStatusTargetArea(e.target.value)}
                  />
                )}
              </p>
            </div>

            {/* Status plan intensity */}
            <div className="status-item col bg-color-4">
              <p>Intensity : {!editable && <span>{status.intensity}</span>}
                {editable && (
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={intensityEdit}
                    onChange={(e) => setStatusIntensity(e.target.value)}
                  />
                )}
              </p>
            </div>
          </div>

        </div>

        <div className="row text-center container mt-3 mb-3">
          <div className="col-4">
            {isLiked ? (
              <AiFillLike
                className="react-icons me-2"
                size={25}
                onClick={handleLikeStatus}
              />
            ) : (
              <AiOutlineLike
                className="react-icons me-2"
                size={25}
                onClick={handleLikeStatus}
              />
            )}

            <span>{status.likedby ? status.likedby.length : 0}</span>
          </div>
          <div className="col-4">
            <AiOutlineComment className="react-icons me-2" size={25} />{" "}
            <span>{status.comments ? status.comments.length : 0}</span>
          </div>
          <div className="col-4">
            <TbShare3
              className="react-icons"
              size={25}
              onClick={() => {
                dispatch(getStatusToShareById(status.id));
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

          {status.comments &&
            status.comments.map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  comment={comment}
                  statusId={status.id}
                  statusUserId={status.userId}
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
          {/* <ShareStatusForm closeModal={closeModal} /> */}
        </div>
      </Modal>
    </div>
  );
}

export default StatusCard;
