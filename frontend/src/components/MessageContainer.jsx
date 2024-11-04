import React, { useEffect } from "react";
import SendInput from "./SendInput"; 
import Messages from "./Messages"; 
import { useSelector, useDispatch } from "react-redux"; 
import { setSelectedUser } from "../redux/userSlice"; 

const MessageContainer = () => {
  // Using Redux to get the selected user, authenticated user, and online users from the store
  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch(); 

  // Check if the selected user is online by checking their ID against the list of online users
  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <>
      {selectedUser !== null ? (
        <div className="md:min-w-[550px] flex flex-col">
          {/* User profile header with avatar and name */}
          <div className="flex items-center px-4 py-2 mb-2 border-b-[1px] text-xl border-b-zinc-500 gap-4 text-white rounded-md">
            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="w-12 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="user-profile" />
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex justify-between gap-2">
                {/* Displaying the selected user's full name */}
                <p>{selectedUser?.fullName}</p>
              </div>
            </div>
          </div>
          <Messages />
          <SendInput />
        </div>
      ) : (
        // If no user is selected, show a welcome message
        <div className="md:min-w-[550px] flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold text-white">
            Hi, {authUser?.fullName}{" "}
          </h1>
          <h1 className="text-xl text-white">Let's start a conversation</h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
