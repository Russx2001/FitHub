import React, { useEffect } from "react";
import Statuses from "../../Components/Statuses";
import { useDispatch, useSelector } from "react-redux";
import { getStatuses } from "../../app/actions/status.actions";
import NewUsersSuggest from "../../Components/NewUsersSuggest";

function StatusPage() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.status);
  useEffect(() => {
    dispatch(getStatuses());
  }, [dispatch]);
  return (
    <div className="container mt-5 mb-5 row">
      <div className="col-md-3"></div>
      <div className="col-md-8">
        <div className="row">
          <div className="col-md-9">
            <Statuses statuses={status.statuses} fetchType="GET_ALL_STATUSES" />
          </div>
        </div>
      </div>
      <div className="col-md-2"></div>
    </div>
  );
}

export default StatusPage;
