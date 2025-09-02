import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {io} from "socket.io-client";

const Ai = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm();

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    // listen for AI messages from backend
    newSocket.on("ai-message", (response) => {
      setMessages((prev) => [...prev, {sender: "ai", text: response}]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const onSubmit = (data) => {
    const userMessage = data.input;
    setMessages((prev) => [...prev, {sender: "user", text: userMessage}]);
    socket.emit("user-response", userMessage); // ✅ match backend
    reset();
  };

  return (
    <div className="flex flex-col bg-secondary justify-between h-full px-10">
      {/* Chat display */}
      <div className="flex-1 p-5 rounded-lg overflow-y-auto">
        <div className="flex gap-3">
          <i className="ri-robot-2-line text-xl text-green-400"></i>
          <p className="bg-gray-700 text-gray-200   rounded-xl h-auto  w-auto p-5">
            Hello! I'm your AI assistant. How can I help you today?
          </p>
        </div>
        {messages.length > 0 &&
          messages.map((m, i) => (
            <div
              key={i}
              className={`flex mb-3 gap-3 ${
                m.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {m.sender === "ai" && (
                <i className="ri-robot-2-line text-xl text-green-400"></i>
              )}

              <p
                className={`px-4 py-2 rounded-xl max-w-xs ${
                  m.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-200"
                }`}
              >
                {m.text}
              </p>

              {m.sender === "user" && (
                <i className="ri-user-3-line text-xl text-blue-400"></i>
              )}
            </div>
          ))}
      </div>

      {/* Input box */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-primary flex items-center shadow-lg mt-5 rounded-2xl p-5 gap-5"
      >
        <input
          {...register("input", {required: "This field is required"})}
          className="w-full border text-white px-3 py-3 rounded-lg"
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
  );
};

export default Ai;
