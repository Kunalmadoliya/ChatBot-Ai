import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {io} from "socket.io-client";

const Ai = () => {
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  useEffect(() => {
    const newSocket = io("http://localhost:3000");

    newSocket.on("connection", (message) => {
      console.log("A user connected");
    });
  }, []);

  const onSubmit = (data) => {
    setMessage(data);

    reset();

    
  };

  return (
    <>
      <div className="flex flex-col bg-secondary justify-between h-full px-10">
        {/* Chat display */}
        <div className="flex-1 p-5 rounded-lg overflow-y-auto">
          {message ? (
            <div className="flex gap-3 ">
              <i className="ri-robot-2-line text-xl"></i>
              <p className="text-gray-400 border bg-primary rounded-xl h-auto border-white w-auto p-5">
                {message}
              </p>
            </div>
          ) : (
            <div className="flex gap-3 ">
              <i className="ri-robot-2-line text-xl"></i>
              <p className="text-gray-400 border bg-primary rounded-xl h-auto border-white w-auto p-5">
                Hello! I'm your AI assistant. How can I help you today?
              </p>
            </div>
          )}
        </div>

        {/* Input box */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-primary   flex items-center shadow-lg mt-5 rounded-2xl p-5 gap-5"
        >
          <input
            {...register("input", {required: "This field is required"})}
            className="w-full border  text-white  px-3 py-3 rounded-lg"
            placeholder="Type something..."
          />
          <button
            type="submit"
            className="w-40 bg-blue-600 py-3 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default Ai;
