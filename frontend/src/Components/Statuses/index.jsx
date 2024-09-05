import React, { useEffect, useState } from "react";
import StatusCard from "../StatusCard";

function Statuses({ statuses, fetchType }) {
  const [statusesList, setStatusesList] = useState([]);

  useEffect(() => {
    if (statuses) {
      setStatusesList(statuses);
    }
  }, [statuses]);

  return (
    <div>
      {statusesList.length ? [...statusesList].reverse().map((status) => {
        return <StatusCard key={status.id} status={status} fetchType={fetchType} />;
      }) : <h5>No Statuses yet...</h5>}
    </div>
  );
}

export default Statuses;
