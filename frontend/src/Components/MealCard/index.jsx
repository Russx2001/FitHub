import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMealById,
  updateMealById,
  likeMealById,
  getMeals,
  getMealsByUserId,
} from "../../app/actions/meal.actions";
import { getAllUsers } from "../../app/actions/user.actions";

import { saveNotification } from "../../app/actions/notification.action";

import { getMealToShareById } from "../../app/slices/meal.slice";
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
//import ShareMealForm from "../ShareMealForm";
import { Link } from "react-router-dom";
import { getMealShareByUserId } from "../../app/actions/mealshare.actions";
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
function MealCard({ meal, fetchType }) {
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editable, setEditable] = useState(false);
  const user = useSelector((state) => state.user);
  const [mealNameEdit, setMealName] = React.useState(meal.mealName);
  const [mealCategoryEdit, setMealCategory] = React.useState(meal.category);
  const [mealIngredientsEdit, setMealIngredients] = React.useState(meal.ingredients);
  const [mealInstructionsEdit, setMealInstructions] = React.useState(meal.instructions);
  const [imgLinkEdit, setImgLinkEdit] = React.useState(meal.imgLink);
  const [comment, setComment] = React.useState("");
  const [isLiked, setIsLiked] = React.useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    if (meal.likedby && meal.likedby.length) {
      const userIdIndex = meal.likedby.indexOf(user.userId);

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
      mealId: meal.id,
      userId: user.userId,
      text: comment,
    };
    await dispatch(saveComment(newComment));

    const newNotification = {
      message: "Commented by " + user.user.username + " on your meal",
      userId: meal.userId,
    };

    await dispatch(saveNotification(newNotification));
    if (fetchType === "GET_ALL_MEALS") {
      await dispatch(getMeals());
    }
    if (fetchType === "GET_ALL_USER_MEALS") {
      await dispatch(getMealShareByUserId(user.userId));
    }
    if (fetchType === "GET_ALL_MEALS_USER") {
      await dispatch(getMealShareByUserId(meal.userId));
    }
    setComment("");
  };

  const handleSubmit = async () => {
    const newMeal = {
      id: meal.id,
      userId: user.userId,
      mealName: mealNameEdit,
      category: mealCategoryEdit,
      ingredients: mealIngredientsEdit,
      instructions: mealInstructionsEdit,
      imgLink: imgLinkEdit,
    };
    await dispatch(updateMealById(newMeal));
    if (fetchType === "GET_ALL_MEALS") {
      await dispatch(getMeals());
    }
    if (fetchType === "GET_ALL_USER_MEALS") {
      await dispatch(getMealShareByUserId(user.userId));
    }
    if (fetchType === "GET_ALL_USER_MEALS") {
      await dispatch(getMealsByUserId(user.userId));
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
      const storageRef = ref(storage, `/meals/${file.name}`);

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

  const handleLikeMeal = async () => {
    const tempLikeArray = meal.likedby ? meal.likedby.slice() : [];
    const userId = user.userId.toString();
    const userIdIndex = tempLikeArray.indexOf(userId);

    if (userIdIndex > -1) {
      tempLikeArray.splice(userIdIndex, 1);
      setIsLiked(false);
    } else {
      tempLikeArray.push(userId);
      setIsLiked(true);
    }

    const likedMeal = {
      id: meal.id,
      likedby: tempLikeArray,
    };

    await dispatch(likeMealById(likedMeal));
    if (fetchType === "GET_ALL_MEALS") {
      await dispatch(getMeals());
    }
    if (fetchType === "GET_ALL_USER_MEALS") {
      await dispatch(getMealsByUserId(meal.userId));
      await dispatch(getMealShareByUserId(user.userId));
    }
    if (fetchType === "GET_ALL_MEALS_USER") {
      await dispatch(getMealsByUserId(meal.userId));
      await dispatch(getMealShareByUserId(meal.userId));
    }
    const newNotification = {
      message: "Like by " + user.user.username + " on your meal",
      userId: meal.userId,
    };

    await dispatch(saveNotification(newNotification));
  };

  function capitalizeFirstLetter(word) {
    // Check if the word is not undefined or null and if it's not an empty string
    if (word && typeof word === 'string' && word.length > 0) {
      // Convert the first character to uppercase and concatenate it with the rest of the word
      return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
      // If the word is undefined, null, or an empty string, return it as is
      return word;
    }
  }

  return (
    <div className="card mb-4 meal-card">
      <div className="card-body">
        <div className="row">
          <div className="col-8">
            <Link
              className="text-decoration-none text-dark"
              to={{
                pathname: `/user/${meal.userId}`,
              }}
            >
              <img
                src={meal.profileImage ? meal.profileImage : UserImage}
                className="meal-profile-image img-fluid me-3"
                alt="Profile"
              />
              <span className="text-left">{meal.username} </span>
            </Link>
            <FollowButton
              userDetails={getUserByIdFunc(user.users, meal.userId)}
            />
          </div>
          <div className="col-2"></div>
          {user.userId === meal.userId && (
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
                      dispatch(deleteMealById(meal.id));
                    }}
                  />
                </>
              )}
            </div>
          )}
        </div>
        <hr />
        <div className="row">
          {!editable && <p>{meal.mealName}</p>}

          {editable && (
            <input
              type="text"
              className="form-control mb-3"
              value={mealNameEdit}
              onChange={(e) => setMealName(e.target.value)}
            />
          )}
        </div>
        <div className="row">
          <Slider className="mb-3">
            {imgLinkEdit &&
              imgLinkEdit.length &&
              imgLinkEdit.map((imgLink) => (
                <div key={imgLink}>
                  <img
                    src={imgLink}
                    className="card-img-top img-fluid"
                    alt="mealImages"
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

          <div className="meal-container">
            {/* Meal plan name */}
            <div className="meal-item">
              <label className="poppins-semibold">Meal plan Name :</label>
              <p>{!editable && <p>{capitalizeFirstLetter(meal.mealName)}</p>}
                {editable && (
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={mealNameEdit}
                    onChange={(e) => setMealName(e.target.value)}
                  />
                )}</p>
            </div>
            <hr />

            {/*Meal plan category*/}
            <div className="meal-item">
              <label className="poppins-semibold">Category :</label>
              <p>{!editable && <p>{capitalizeFirstLetter(meal.category)}</p>}
                {editable && (
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={mealCategoryEdit}
                    onChange={(e) => setMealCategory(e.target.value)}
                  />
                )}</p>
            </div>
            <hr />

            {/* Meal plan ingredients */}
            <div className="meal-item">
              <label className="poppins-semibold">Ingredients :</label>
              <p>{!editable && <p>{capitalizeFirstLetter(meal.ingredients)}</p>}
                {editable && (
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={mealIngredientsEdit}
                    onChange={(e) => setMealIngredients(e.target.value)}
                  />
                )}</p>
            </div>
            <hr />

            {/* Meal plan instructions */}
            <div className="meal-item">
              <label className="poppins-semibold">Cooking Instructions :</label>
              <p>{!editable && <p>{capitalizeFirstLetter(meal.instructions)}</p>}
                {editable && (
                  <input
                    type="text"
                    className="form-control mb-3"
                    value={mealInstructionsEdit}
                    onChange={(e) => setMealInstructions(e.target.value)}
                  />
                )}</p>
            </div>

          </div>
        </div>
        <div className="row text-center container mt-3 mb-3">
          <div className="col-4">
            {isLiked ? (
              <AiFillLike
                className="react-icons me-2"
                size={25}
                onClick={handleLikeMeal}
              />
            ) : (
              <AiOutlineLike
                className="react-icons me-2"
                size={25}
                onClick={handleLikeMeal}
              />
            )}

            <span>{meal.likedby ? meal.likedby.length : 0}</span>
          </div>
          <div className="col-4">
            <AiOutlineComment className="react-icons me-2" size={25} />{" "}
            <span>{meal.comments ? meal.comments.length : 0}</span>
          </div>
          <div className="col-4">
            <TbShare3
              className="react-icons"
              size={25}
              onClick={() => {
                dispatch(getMealToShareById(meal.id));
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

          {meal.comments &&
            meal.comments.map((comment) => {
              return (
                <Comment
                  key={comment.id}
                  comment={comment}
                  mealId={meal.id}
                  mealUserId={meal.userId}
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
          {/* <ShareMealForm closeModal={closeModal} /> */}
        </div>
      </Modal>
    </div>
  );
}

export default MealCard;
