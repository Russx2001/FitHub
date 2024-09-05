import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMealsByUserId, saveMeal } from "../../app/actions/meal.actions";
import storage from "../../util/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function MealAdd() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const fileInputRef = useRef(null);

  const [mealName, setMealName] = useState("");
  const [mealCategory, setMealCategory] = useState("");
  const [mealIngredients, setMealIngredients] = useState("");
  const [mealInstructions, setMealInstructions] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [activeButton, setActiveButton] = useState("");

  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const meal = {
      userId: user.userId,
      mealName,
      mealCategory,
      mealIngredients,
      mealInstructions,
      imgLink,
    };

    await dispatch(saveMeal(meal));
    await dispatch(getMealsByUserId(user.userId));
    setMealName("");
    setMealCategory("");
    setMealIngredients("");
    setMealInstructions("");
    setImgLink("");
    fileInputRef.current.value = "";
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
            setImgLink((prevLinks) => [...prevLinks, url]);
            console.log(url);
          });
        }
      );
    }
  };

  const handleButtonClick = (category) => {
    setMealCategory(category);
    setActiveButton(category);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="container mb-3 card create-card">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <h1 className="mt-2">Add a New Meal Plan</h1>

          <div className="mt-2 mb-3">
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
                '& .MuiInputLabel-root': { color: 'black' }, // Change label color to black
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'blue', // Default border color is blue
                  },
                  '&:hover fieldset': {
                    borderColor: 'blue', // Border color on hover remains blue
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'blue', // Border color when focused remains blue
                  },
                },
              }}
              noValidate
              autoComplete="off"
            >
              <div className="mt-2 mb-3">
                <TextField
                  id="outlined-multiline-flexible"
                  label="Meal Plan Name"
                  placeholder="Meal Plan Name"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  InputProps={{
                    style: { color: 'black', backgroundColor: 'white' },
                    inputProps: { style: { color: 'black' } }, // Style for input properties
                    onFocus: handleFocus,
                    onBlur: handleBlur,
                  }}
                  InputLabelProps={{
                    style: { color: isFocused ? 'black' : 'grey' }, // Change label color based on focus state
                  }}
                  variant="outlined"
                />
              </div>
            </Box>

            <label htmlFor="mealCategorySelect" className="labelCategory poppins-regular fs-6 ms-3">Category</label>
            <ButtonGroup className="mb-4" variant="contained" aria-label="Meal category" style={{ border: "1px solid blue" }}>
              <Button
                onClick={() => handleButtonClick('vegetarian')}
                style={{
                  color: activeButton === 'vegetarian' ? "white" : "blue",
                  backgroundColor: activeButton === 'vegetarian' ? "blue" : "white"
                }}
              >
                Vegetarian
              </Button>
              <Button
                onClick={() => handleButtonClick('vegan')}
                style={{
                  color: activeButton === 'vegan' ? "white" : "blue",
                  backgroundColor: activeButton === 'vegan' ? "blue" : "white"
                }}
              >
                Vegan
              </Button>
              <Button
                onClick={() => handleButtonClick('non-veg')}
                style={{
                  color: activeButton === 'non-veg' ? "white" : "blue",
                  backgroundColor: activeButton === 'non-veg' ? "blue" : "white"
                }}
              >
                Non-Veg
              </Button>
            </ButtonGroup>

            <textarea placeholder="Ingredients" className="form-control mb-3" id="mealIngredientsIn" value={mealIngredients} onChange={(event) => {
              setMealIngredients(event.target.value);
              event.target.rows = Math.max(1, event.target.value.split('\n').length);
            }}></textarea>

            <textarea placeholder="Cooking Instructions" className="form-control mb-3" id="mealIngredientsIn" value={mealInstructions} onChange={(event) => {
              setMealInstructions(event.target.value);
              event.target.rows = Math.max(1, event.target.value.split('\n').length);
            }}></textarea>

          </div>
          <i>*maximum 4 images</i>
          <div className="mb-3">
            {imgLink && (
              <img src={imgLink} className="img-fluid me-3" alt="Profile" />
            )}

            <input
              type="file"
              className="form-control"
              onChange={(e) => uploadImage(e)}
              ref={fileInputRef}
              multiple
            />
          </div>

          <button type="submit" className="btn btn-outline-primary">
            SHARE
          </button>
        </form>
      </div>
    </div>
  );
}

export default MealAdd;
