import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Requests from "../../Functions/Requests";
import Button from "@material-ui/core/Button";
const uniqid = require("uniqid");

const useStyles = makeStyles((theme) => ({
  root_button: {
    // background: "rgb(0, 110, 255)",
    color: "rgb(0, 110, 255)",
    border: "1px solid rgb(0, 110, 255)",
    padding: "1px",

    // "&:hover": {
    //   background: "rgb(8 112 255/85%)",
    // },
  },
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
        name="title"
        label="Title"
        id="outlined-margin-normal"
        defaultValue=" "
        className={classes.textField}
        margin="normal"
        variant="outlined"
      />
      <TextField
        name="descriptiio"
        label="Description"
        id="outlined-margin-normal"
        defaultValue=" "
        className={classes.textField_description}
        margin="normal"
        variant="outlined"
      />

      <div className="create_task_buttons">
        <Button
          onClick={() => {
            props.state_function.setOpenCreateTask(false);
          }}
          variant="outlined"
          color="primary"
          classes={{
            root: classes.root_button,
          }}
        >
          cancel
        </Button>
        <Button
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
          variant="outlined"
          color="primary"
          classes={{
            root: classes.root_button,
          }}
        >
          Create
        </Button>
      </div>
    </section>
  );
}
