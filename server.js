const express = require("express");
const cors = require("cors");
const db = require("./database");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/api", (req, res, next) => {
  res.json({ message: "Welcome to the API!" });
});

server.get("/api/users", (req, res, next) => {
  const users = db.getUsers();
  if (users) {
    res.json(users);
  } else {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

server.get("/api/users/:id", (req, res, next) => {
  const id = req.params.id;
  const user = db.getUserById(id);

  if (user) {
    res.json(user);
  } else if (!user) {
    res
      .status(404)
      .json({ message: "The user with the specified ID does not exist." });
  } else {
    res
      .status(500)
      .json({ errorMessage: "The user information could not be retrieved." });
  }
});

server.post("/api/users", (req, res, next) => {
  const newUser = db.createUser({
    name: req.body.name,
    bio: req.body.bio,
  });
  if (newUser.name && newUser.bio) {
    res.status(201).json(newUser);
  } else if ((!newUser.name && newUser.bio) || (!newUser.bio && newUser.name)) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for user." });
  } else {
    res.status(500).json({
      errorMessage: "There was an error while saving the user to the database",
    });
  }
});

server.put("/api/users/:id", (req, res, next) => {
  const user = db.getUserById(req.params.id);
  if (user) {
    const editUser = db.updateUser(req.params.id, {
      name: req.body.name,
      bio: req.body.bio,
    });
    if (editUser.name && editUser.bio) {
      res.status(200).json({
        message: `User ID ${req.params.id} updated to name: ${editUser.name}, bio: ${editUser.bio} `,
      });
    } else if (
      (!editUser.name && editUser.bio) ||
      (editUser.name && !editUser.bio)
    ) {
      res.status(404).json({
        errorMessage: "Please provide name and bio for the user.",
      });
    } else {
      res.status(500).json({
        errorMessage: "The user information could not be modified.",
      });
    }
  } else if (!user) {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  } else {
    res.status(500).json({
      errorMessage: "The user information could not be modified.",
    });
  }
});

server.delete("/api/users/:id", (req, res, next) => {
  const user = db.getUserById(req.params.id);
  if (user) {
    db.deleteUser(req.params.id);
    res.status(204).end();
  } else if (!user) {
    res.status(404).json({
      message: "The user with the specified ID does not exist.",
    });
  } else {
    res.status(500).json({
      errorMessage: "The user could not be removed",
    });
  }
});

server.listen(8080, () => {
  console.log("Server started on port 8080");
});
