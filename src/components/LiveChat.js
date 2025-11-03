import React, { useEffect, useState } from "react";
import LiveComments from "./LiveComments";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/liveChatSlice";
import { getRandomComments, getRandomNames } from "../utils/helper";

const LiveChat = () => {
  const dispatch = useDispatch();
  const liveComments = useSelector((store) => store.liveChat.messages);
  const [sendLiveMessage, setSendLiveMessage] = useState(" ");
  useEffect(() => {
    const i = setInterval(() => {
      // API POLLING
      console.log("API POLLING");
      dispatch(
        addMessage({
          name: getRandomNames(),
          comment: getRandomComments(),
        })
      );
    }, 1250);
    return () => clearTimeout(i);
  }, []);
  return (
    <>
      <div className="w-full h-72 rounded-lg border-red-600 border-2 m-2 p-4 bg-black overflow-y-scroll flex flex-col-reverse scroll">
        <div>
          {
            //Disclaimer: Dont use index as keys
            liveComments.map((c, index) => (
              <LiveComments key={index} name={c.name} comment={c.comment} />
            ))
          }
        </div>
      </div>
      <form
        className="w-full rounded-xl border-red-600 border-2 m-2 p-4 bg-black flex"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("On form submit", sendLiveMessage);
          dispatch(
            addMessage({
              name: "Ligma",
              comment: sendLiveMessage,
            })
          );
          setSendLiveMessage("");
        }}
      >
        <input
          className="focus:outline-none rounded-xl border-red-600 px-2 bg-gray-900 w-2/3"
          type="text"
          placeholder="Chat..."
          value={sendLiveMessage}
          onChange={(e) => {
            setSendLiveMessage(e.target.value);
          }}
        />
        <button className="ml-10 border-2 border-red-600 rounded-xl w-20 hover:bg-red-600 ease-in duration-300">
          Send
        </button>
      </form>
    </>
  );
};

export default LiveChat;
