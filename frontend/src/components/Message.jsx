import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();

  // Retrieve authUser and selectedUser from the Redux store
  const { authUser, selectedUser } = useSelector((store) => store.user);

  // Effect to scroll to the latest message whenever it updates
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]); // Dependency on message to trigger scrolling

  return (
    <div
      ref={scroll} // Attach the scroll reference to this div
      className={`chat ${
        message?.senderId === authUser?._id ? "chat-end" : "chat-start"
      }`} // Conditional class for message alignment
    >
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User avatar"
            src={
              message?.senderId === authUser?._id
                ? authUser?.profilePhoto
                : selectedUser?.profilePhoto
            }
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs text-white opacity-50">12:45</time>
      </div>
      <div
        className={`chat-bubble ${
          message?.senderId !== authUser?._id ? "bg-gray-200 text-black" : ""
        }`}
      >
        {message?.message}
      </div>
    </div>
  );
};

export default Message;
