import express from "express";
import mongoose from "mongoose";
import Quote from "./model/quotemodel.js";
import cors from "cors";
import User from "./model/usermodel.js";
const app = express();
app.use(express.json());
app.use(cors());
app.get("/test", (req, res) => {
  res.send("okay..!");
});
app.post("/create_quote", async (req, res) => {
  try {
    const { quote, author,authorID } = req.body;
    const new_quote = new Quote({ quote: quote, author: author,authorID:authorID });
    const subhash = await new_quote.save();
    res.status(200).json(subhash);
  } catch (error) {
    res.status(404).json(error);
  }
});

app.post("/create_user", async (req, res) => {
  try {
    const { username, emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (user != null) return res.status(404).json({ message: "user already exist" });
    const newUser = User({ username, emailId, password });
    const u = await newUser.save();
    return res.status(200).json(u);
  } catch {
    res.status(404).json(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const {  emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (user == null)return res.status(404).json({ message: "user does not exist" });
    if(user.password!=password) return res.status(404).json({ message: "wrong password" });
    return res.status(200).json(user);
  } catch {
    res.status(404).json(error);
  }
});

app.post("/", async (req, res) => {
  try {
    const {userID} = req.body;
    console.log(userID);
    const q = await Quote.find({ authorID : userID});
    res.status(200).json(q);
  } catch (error) {
    res.status(404).json(error);
  }
});

app.get("/", async (req, res) => {
  try {
    const q = await Quote.find();
    res.status(200).json(q);
  } catch (error) {
    res.status(404).json(error);
  }
});

mongoose
  .connect(
    "mongodb+srv://admin:Aakashkumar01@cluster0.vcswzrv.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(3000, () => {
      console.log("db connected");
      console.log("server is working");
    });
  })
  .catch((ERROR) => {
    console.log(ERROR);
  });
