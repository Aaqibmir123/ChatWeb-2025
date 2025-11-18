"use client";
import React from "react";
import { respondToFriendRequest } from "@/app/services/addFriend";

const AcceptRequest = ({ requestId}) => {
  const handleAccept = async () => {
         const res = await respondToFriendRequest(requestId);
          if (res.status === 200) {
            onSuccess();
          } 
  };

  return (
    <button onClick={handleAccept} className="btn btn-primary">
      Confirm
    </button>
  );
};

export default AcceptRequest;
