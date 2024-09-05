import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkoutsByUserId, saveWorkout } from "../../app/actions/workout.actions";
import storage from "../../util/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function WorkoutAdd() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const fileInputRef = useRef(null);

  const [introduction, setIntroduction] = React.useState("");
  const [overview, setOverview] = React.useState("");
  const [schedule, setSchedule] = React.useState("");
  const [safetyTips, setSafetyTips] = React.useState("");
  const [imgLink, setImgLink] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = {
      userId: user.userId,
      introduction,
      overview,
      schedule,
      safetyTips,
      imgLink,
    };

    await dispatch(saveWorkout(workout));
    await dispatch(getWorkoutsByUserId(user.userId));
    setIntroduction("");
    setOverview("");
    setSchedule("");
    setSafetyTips("");
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
            setImgLink((prevLinks) => [...prevLinks, url]);
            console.log(url);
          });
        }
      );
    }
  };

  return (
    <div className="container mb-3 card create-card">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <h1 className="mt-2">Add a New Workout Plan</h1>

          <div className="mt-2 mb-3">
            <input
              type="text"
              placeholder="Workout Introduction"
              className="form-control mb-3"
              value={introduction}
              onChange={(e) => setIntroduction(e.target.value)}
            />

            <textarea placeholder="Overview" className="form-control mb-3" id="workoutIngredientsIn" value={overview} onChange={(event) => {
              setOverview(event.target.value);
              event.target.rows = Math.max(1, event.target.value.split('\n').length);
            }}></textarea>

            <textarea placeholder="Workout Schedule" className="form-control mb-3" id="schedule" value={schedule} onChange={(event) => {
              setSchedule(event.target.value);
              event.target.rows = Math.max(1, event.target.value.split('\n').length);
            }}></textarea>

            <textarea placeholder="Safety Tips" className="form-control mb-3" id="safetyTips" value={safetyTips} onChange={(event) => {
              setSafetyTips(event.target.value);
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

export default WorkoutAdd;
