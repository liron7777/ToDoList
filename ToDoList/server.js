const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

const {
  add_to_db,
  find,
  update,
  delete_task,
  change_task_list,
} = require("./Client/src/Functions/DB");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function connect(req, res, request) {
  if (req.body.password === "" || req.body.username === "") {
    res.end();
  } else {
    if (
      ((await find("Users", req.body)).length === 0 && request === "sign_up") ||
      ((await find("Users", req.body)).length >= 1 && request === "login")
    ) {
      request === "sign_up" ? add_to_db("Users", req.body) : "";
      res.send({
        user_id: (await find("Users", req.body))[0]._id,
        user_name: (await find("Users", req.body))[0].username,
      });
    } else {
      res.end();
    }
  }
}

app.post("/sign_up", async (req, res) => {
  connect(req, res, "sign_up");
  // res.send({ login: 'sign_up' })
});

app.post("/login", async (req, res) => {
  connect(req, res, "login");
  // res.send({ login: 'login' })
});

app.post("/create", async (req, res) => {
  add_to_db("Tasks", req.body);
  res.send({ new_task: req.body });
});

app.get("/tasks_list", async (req, res) => {
  res.send({
    tasks_list: await find("Tasks", { user_id: `${req.query.user_id}` }),
  });
});

app.post("/move", async (req, res) => {
  update(req.body.task_id, req.body.status_task);
  res.send({ move_to_status: req.body.status_task });
});

app.delete("/task", (req, res) => {
  delete_task(req.body.task_id);
  res.end;
});

app.post("/tasks_list", (req, res) => {
  change_task_list(req.body.user_id, req.body.new_list);
  res.send({ change_task_list: "done" });
  
});

app.listen(port, () => console.log(`Listening on port ${port}`));
