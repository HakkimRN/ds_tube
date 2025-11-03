// MainComponent.js
import React from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";

export const MainComponent = () => {
  return (
    <div>
      <ButtonList />
      <div className="mt-40">
      <VideoContainer />
      </div>
    </div>
  );
};
