require("dotenv").config();
const app = require("./src/app");
const {createServer} = require("node:http");
const {Server} = require("socket.io");
const generatePrompt = require("./src/services/ai.service");


const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("A user Connected");

  socket.on("user-response", async (msg) => {
    console.log(msg);

    let response = await generatePrompt(msg);

    socket.emit("ai-message", response);
  });
});
server.listen(3000, () => {
  console.log("server running at 3000");
});
