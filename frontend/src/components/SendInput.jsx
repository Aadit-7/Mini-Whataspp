import React, { useState } from "react"; 
import { IoSend } from "react-icons/io5"; 
import axios from "axios"; 
import { useDispatch, useSelector } from "react-redux"; 
import { setMessages } from "../redux/messageSlice"; 
import { BASE_URL } from ".."; 

const SendInput = () => {
  const [message, setMessage] = useState(""); // Local state to store the current message
  const dispatch = useDispatch(); // Redux dispatch to send actions
  const { selectedUser } = useSelector((store) => store.user); // Accessing the selected user from Redux store
  const { messages } = useSelector((store) => store.message); // Accessing the current messages from the Redux store

  // Event handler for form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    try {
      // Sending the message to the server via a POST request
      const res = await axios.post(
        `${BASE_URL}/api/v1/message/send/${selectedUser?._id}`, // API endpoint, with the selected user's ID
        { message }, // Payload containing the message to be sent
        {
          headers: {
            "Content-Type": "application/json", // Ensuring the payload is sent as JSON
          },
          withCredentials: true, // Ensuring cookies (if any) are sent with the request for authentication/session
        }
      );
      // Dispatching action to update the message state in Redux with the new message
      dispatch(setMessages([...messages, res?.data?.newMessage]));
    } catch (error) {
      // Error handling if the request fails
      console.log(error);
    }
    setMessage(""); // Reset the message input field after submission
  };

  return (
    // Form component for message input
    <form onSubmit={onSubmitHandler} className="px-4 my-3">
      <div className="relative w-full">
        {/* Input field for typing the message */}
        <input
          value={message} // Bound to the local state 'message'
          onChange={(e) => setMessage(e.target.value)} // Updating the state on user input
          type="text" // Input type is text
          placeholder=".........typing......" // Placeholder text when the input is empty
          className="block w-full p-3 text-sm text-white bg-gray-400 bg-opacity-0 border border-white rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg" // Tailwind CSS classes for styling
        />
        {/* Submit button to send the message */}
        <button
          type="submit"
          className="absolute inset-y-0 flex items-center pr-4 end-0"
        >
          <IoSend /> {/* Send icon displayed within the button */}
        </button>
      </div>
    </form>
  );
};

export default SendInput; // Exporting the component for use in other parts of the application
