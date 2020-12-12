const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

const {
  add_to_db,
  find,
  update,
  delete_task,
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
});

app.post("/login", async (req, res) => {
  connect(req, res, "login");
});

app.post("/create", async (req, res) => {
  add_to_db("Tasks", req.body);
  res.send({ new_task: req.body });
});

app.get("/tasks_list", async (req, res) => {
  console.log(req.query.user_id);
  res.send({
    tasks_list: await find("Tasks", { user_id: `${req.query.user_id}` }),
  });
});

app.post("/move", async (req, res) => {
  // let value_status = "";
  // switch (req.body.status_task) {
  //   case "todo":
  //     value_status = "in_pragress";
  //     break;
  //   case "in_pragress":
  //     value_status = "done";
  //     break;
  //   case "done":
  //     value_status = "todo";
  // }
  // console.log(req.body.task_id, value_status);
  update(req.body.task_id, req.body.status_task);
  res.send({ move_to_status: req.body.status_task });
});

app.delete("/task", (req, res) => {
  delete_task(req.body.task_id);
  res.end;
});

app.listen(port, () => console.log(`Listening on port ${port}`));
