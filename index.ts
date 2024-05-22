import express from "express";
import {
  saveAuthor,
  allAuthors,
  getAuthorById,
  getMonographyById,
  allMonographs,
  saveMonography,
  saveAuthorAddress,
} from "./routes/userService";  
const router = express.Router();
import cors from "cors";
import { allBooks } from "./routes/bookService";
import { listAuthor2, listMonography2, saveAuthor2, saveMonography2 } from "./routes/mono";

//import cors = require("cors");
//const usersRouter = require("./routes/users");
const app = express();
app.use(cors());
app.use(express.json());
//const path = require("path");
const port = 3000;
//app.use(express.static("public"));
app.use(router);

//app.use("/", express.static("public"));
//router.get("/first", (req, res) => {
//  res.sendFile(path.join(__dirname + "/public/index.html"));
//  res.send("Hello World2");
//});

router.get("/", (req, res) => {
  res.send("SI");
});

router.post("/authors2", saveAuthor2)
router.get("/authors2", listAuthor2)
router.post("/monographs2", saveMonography2)
router.get("/monographs2", listMonography2)

router.get("/authors", allAuthors);
router.get("/authors/:id", getAuthorById);
router.post("/authors", saveAuthorAddress);

router.get("/monographs", allMonographs);
router.get("/monographs/:id", getMonographyById);
router.post("/monographs", saveMonography);

router.get("/books", allBooks )

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
