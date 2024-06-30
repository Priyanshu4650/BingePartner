// import { Server } from "socket.io";
import express from "express";
import mongoose, { mongo } from "mongoose";
import cors from "cors";

const mongoURL =
  "mongodb+srv://priyanshu022017:foCpjHfn6K8drRUc@users.zplos5j.mongodb.net/?retryWrites=true&w=majority&appName=Users";

mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.error(e.message);
  });

const users = [
  {
    username: "7017987049",
    password: "password",
  },
];

const port = 5000;

const app = express();
app.use(cors());
app.listen(port, () => {
  console.log(`Server listening on PORT: ${port}`);
});
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Home Page" });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username && users[i].password == password) {
      return res.json({ success: true, message: "Login Successful" });
    }
  }

  res.json({ success: false, message: "Invalid credentials" });
});

// const expressServer = app.listen(port, () => {
//   console.log(`Server listening on PORT: ${port}`);
// });

// const io = new Server(expressServer, {
//   cors: {
//     origin: [
//       "http://192.168.29.65:3000",
//       "http://localhost:3000",
//       "http://127.0.0.1:5500",
//     ],
//   },
// });

// io.on("connection", (socket) => {
//   console.log(`${socket.id} is connected....`);

//   // to send a message
//   socket.on("message", (message) => {
//     if (message.substring(0, 5) != "You: ") {
//       io.emit("message", `${message}`);
//     }
//   });

//   // when it gets disconnected
//   socket.on("disconnect", () => {
//     console.log(`${socket.id} got disconnected`);
//   });
// });
