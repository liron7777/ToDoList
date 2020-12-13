import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Requests from "../../Functions/Requests";
const uniqid = require("uniqid");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    width: "25ch",
  },
  textField_description: {
    width: "50ch",
  },
}));

export default function CreateTask(props) {
  const classes = useStyles();

  return (
    <section className="create_task">
      <h3>Creacte task</h3>
      <TextField
        label="Title"
        id="outlined-margin-normal"
        defaultValue=" "
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Description"
        id="outlined-margin-normal"
        defaultValue=" "
        className={classes.textField_description}
        margin="normal"
        variant="outlined"
      />

      <button
        onClick={() => {
          props.state_function.setOpenCreateTask(false);
        }}
      >
        cancel
      </button>
      <input type="text" placeholder="Title" name="title" />
      <input type="text" placeholder="Descriptiion" name="descriptiio" />
      <button
        onClick={() => {
          props.state_function.setOpenCreateTask(false);
          let value_input = {
            title: document.querySelector('[name="title"]').value,
            descriptiio: document.querySelector('[name="descriptiio"]').value,
            status: "todo",
            date: new Date().toLocaleDateString("en-GB"),
            task_id: uniqid(),
            user_id: props.user_id,
          };
          Requests.post_value("/create", value_input).then((res) => {
            props.state_function.setTasksList((prevArray) => [
              ...prevArray,
              res.data.new_task,
            ]);
          });
        }}
      >
        Create
      </button>
    </section>
  );
}
