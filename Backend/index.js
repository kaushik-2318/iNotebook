const connectToMongo = require("./db");
const express = require("express");
var cors = require('cors');
var appp = express();
connectToMongo();

const app = express();
const port = 5050;

appp.use(cors());
app.use(express.json());

//Availabe Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.get("/", (req, res) => {
  res.send("Hello Kaushik!");
});
app.listen(port, () => {
  console.log(`iNoteBook backend listing on port ${port}`);
});
