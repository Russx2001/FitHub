import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatusesByUserId, saveStatus } from "../../app/actions/status.actions";
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

function StatusAdd() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [duration, setStatusDuration] = React.useState(15); // Initial duration set to 15 minutes
  const [type, setStatusType] = React.useState("");
  const [targetArea, setStatusTargetArea] = React.useState("");
  const [intensity, setStatusIntensity] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const status = {
      userId: user.userId,
      duration,
      type,
      targetArea,
      intensity,
    };

    await dispatch(saveStatus(status));
    await dispatch(getStatusesByUserId(user.userId));
    setStatusType("");
    setStatusTargetArea("");
    setStatusIntensity("");

  };

  return (
    <div className="container mb-3 card create-card">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <h1 className="mt-2 mb-4">What's Your Daily Update?</h1>

          <div className="text-center">
            <label className="setDuraLabel text-center poppins-semibold fs-5">Duration</label>
            <div className="mx-4">
              <Slider
                value={duration}
                onChange={(e, newValue) => setStatusDuration(newValue)}
                aria-labelledby="status-duration-slider"
                step={15} // Each step represents 15 minutes
                marks // Show marks at each step
                min={15}
                max={240} // Maximum duration set to 4 hours (240 minutes)
                valueLabelDisplay="auto" // Display the value label
                valueLabelFormat={(value) => `${value} mins`} // Format the value label
              />
            </div>

            <div class="text-center mb-2">
              <label class="text-center poppins-semibold fs-5">Type</label>
            </div>
            <ButtonGroup className="mb-3" variant="contained" aria-label="Meal category" style={{ border: "1px solid blue" }}>
              <Button
                onClick={() => setStatusType(type === 'strength' ? '' : 'strength')}
                style={{
                  color: type === 'strength' ? "white" : "blue",
                  backgroundColor: type === 'strength' ? "blue" : "white"
                }}
              >
                Strength
              </Button>
              <Button
                onClick={() => setStatusType(type === 'cardio' ? '' : 'cardio')}
                style={{
                  color: type === 'cardio' ? "white" : "blue",
                  backgroundColor: type === 'cardio' ? "blue" : "white"
                }}
              >
                Cardio
              </Button>
            </ButtonGroup>


            <div class="text-center mb-2">
              <label class="text-center poppins-semibold fs-5">Target Area</label>
            </div>
            <ButtonGroup className="mb-3" variant="contained" aria-label="Target Area" style={{ border: "1px solid blue" }}>
              <Button
                onClick={() => setStatusTargetArea(targetArea === 'Full Body' ? '' : 'Full Body')}
                style={{
                  color: targetArea === 'Full Body' ? "white" : "blue",
                  backgroundColor: targetArea === 'Full Body' ? "blue" : "white"
                }}
              >
                Full Body
              </Button>
              <Button
                onClick={() => setStatusTargetArea(targetArea === 'Lower Body' ? '' : 'Lower Body')}
                style={{
                  color: targetArea === 'Lower Body' ? "white" : "blue",
                  backgroundColor: targetArea === 'Lower Body' ? "blue" : "white"
                }}
              >
                Lower Body
              </Button>
              <Button
                onClick={() => setStatusTargetArea(targetArea === 'Upper Body' ? '' : 'Upper Body')}
                style={{
                  color: targetArea === 'Upper Body' ? "white" : "blue",
                  backgroundColor: targetArea === 'Upper Body' ? "blue" : "white"
                }}
              >
                Upper Body
              </Button>
              <Button
                onClick={() => setStatusTargetArea(targetArea === 'Core' ? '' : 'Core')}
                style={{
                  color: targetArea === 'Core' ? "white" : "blue",
                  backgroundColor: targetArea === 'Core' ? "blue" : "white"
                }}
              >
                Core
              </Button>
            </ButtonGroup>


            <div class="text-center mb-2">
              <label class="text-center poppins-semibold fs-5">Intensity</label>
            </div>
            <ButtonGroup className="mb-3" variant="contained" aria-label="Workout Intensity" style={{ border: "1px solid blue" }}>
              <Button
                onClick={() => setStatusIntensity(intensity === 'Beginner' ? '' : 'Beginner')}
                style={{
                  color: intensity === 'Beginner' ? "white" : "blue",
                  backgroundColor: intensity === 'Beginner' ? "blue" : "white"
                }}
              >
                Beginner
              </Button>
              <Button
                onClick={() => setStatusIntensity(intensity === 'Intermediate' ? '' : 'Intermediate')}
                style={{
                  color: intensity === 'Intermediate' ? "white" : "blue",
                  backgroundColor: intensity === 'Intermediate' ? "blue" : "white"
                }}
              >
                Intermediate
              </Button>
              <Button
                onClick={() => setStatusIntensity(intensity === 'Advance' ? '' : 'Advance')}
                style={{
                  color: intensity === 'Advance' ? "white" : "blue",
                  backgroundColor: intensity === 'Advance' ? "blue" : "white"
                }}
              >
                Advance
              </Button>
            </ButtonGroup>

          </div>

          <button type="submit" className="btn btn-outline-primary">
            SHARE
          </button>
        </form>
      </div>
    </div>
  );
}

export default StatusAdd;
