import React from "react";
import { USER_ICON } from "../utils/constants";

const LiveComments = ({name, comment}) => {
  return (
    <div className="flex items-center">
      <img className="w-8 h-8" alt="user" src={USER_ICON} />
       <div className="m-2 px-3 flex space-x-2">
        <p className="font-bold">{name}</p>
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default LiveComments;
