import React, { useEffect, useState } from "react";
import WorkoutCard from "../WorkoutCard";

function Workouts({ workouts, fetchType }) {
  const [workoutsList, setWorkoutsList] = useState([]);

  useEffect(() => {
    if (workouts) {
      setWorkoutsList(workouts);
    }
  }, [workouts]);

  return (
    <div>
      {workoutsList.length ? [...workoutsList].reverse().map((workout) => {
        return <WorkoutCard key={workout.id} workout={workout} fetchType={fetchType} />;
      }) : <h5>No Workouts yet...</h5>}
    </div>
  );
}

export default Workouts;
