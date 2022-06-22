const express = require("express");
const cors = require("cors");
const app = express();

const users = require('./routes/user.routes');
const projects = require("./routes/project.routes");

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to vinayak's application." });
});

app.use('/api/users', users);
app.use('/api/projects', projects);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});