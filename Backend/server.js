require("dotenv").config();
const app = require("./src/app");
const {createServer} = require("node:http");
const {Server} = require("socket.io");
const generatePrompt = require("./src/services/ai.service");

const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("user-response", async (msg) => {
    console.log(msg);

    const res = await generatePrompt(msg);
    socket.emit("chat message", res);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
