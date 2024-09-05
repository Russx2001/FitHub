import React, { useEffect } from "react";
import Workouts from "../../Components/Workouts";
import { useDispatch, useSelector } from "react-redux";
import { getWorkouts } from "../../app/actions/workout.actions";
import NewUsersSuggest from "../../Components/NewUsersSuggest";

function WorkoutPlan() {
  const dispatch = useDispatch();
  const workout = useSelector((state) => state.workout);
  useEffect(() => {
    dispatch(getWorkouts());
  }, [dispatch]);
  return (
    <div className="container mt-5 mb-5 row">
      <div className="col-md-3"></div>
      <div className="col-md-8">
        <div className="row">
          {/* <div className="col-12">
            <NewUsersSuggest />
          </div> */}
          <div className="col-12 mt-3">
            <Workouts workouts={workout.workouts} fetchType="GET_ALL_WORKOUTS" />
          </div>
        </div>
      </div>
      <div className="col-md-2"></div>
    </div>
  );
}

export default WorkoutPlan;
