"use client";
import React from "react";
import { cancelFriendRequest } from "@/app/services/addFriend";
const CancelRequest = ({requestId}) => {
       console.log("Cancel button clicked for requestId:", requestId);

    const handleCancel = async () => {
      const res = await cancelFriendRequest(requestId);
      console.log("Response from server:", res);
    };

  return <div>
    <button className="btn btn-secondary" onClick={handleCancel}>
      Cancel
    </button>
  </div>;
};

export default CancelRequest;
