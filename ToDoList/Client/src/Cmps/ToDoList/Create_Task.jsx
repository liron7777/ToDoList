import React from "react";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Requests from "../../Functions/Requests";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root_input: {
    "& label.Mui-focused": {
      color: "rgb(0, 110, 255)",
    },
    "& .MuiOutlinedInput-root": {
      " &.Mui-focused fieldset": {
        border: "1.5px solid rgb(0, 110, 255)",
      },
    },
  },
  textField: {
    marginRight: theme.spacing(2),
  },

  sizeFieldDescriptiio: {
    width: "300px",
  },
  root_button: {
    color: " rgb(44, 44, 44)",
    "&:hover": {
      background: " rgb(0, 110, 255,0.70)",
      color: "white",
    },
  },
  color_create: {
    color: "rgb(0, 110, 255)",
  },
}));

export default function Create_Task(props) {
  console.log("Create_Task");
  const classes = useStyles();
  const uniqid = require("uniqid");
  return (
    <div>
      <Dialog
        className="create_task_window"
        open={true}
        onClose={() => {
          props.setOpen(false);
        }}
      >
        <DialogTitle>{"Creacte task"}</DialogTitle>
        <DialogContent className={classes.root_input}>
          <TextField
            className={classes.textField}
            name="title"
            label="Title"
            id="title"
            defaultValue=" "
            margin="normal"
            variant="outlined"
          />
          <TextField
            className={(classes.textField, classes.sizeFieldDescriptiio)}
            classes={{
              root: classes.textField,
              root: classes.sizeFieldDescriptiio,
              input: classes.borderColor,
            }}
            name="descriptiio"
            label="Description"
            id="descriptiio"
            defaultValue=" "
            margin="normal"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button
            className={classes.root_button}
            onClick={() => {
              props.setOpen(false);
            }}
            color="primary"
          >
            cancel
          </Button>
          <Button
            className={classes.root_button}
            onClick={() => {
              props.setOpen(false);
              let value_input = {
                title: document.querySelector('[name="title"]').value,
                descriptiio: document.querySelector('[name="descriptiio"]')
                  .value,
                status: "todo",
                date: new Date().toLocaleDateString("en-GB"),
                task_id: uniqid(),
                user_id: props.user_id,
              };
              Requests.post_value("/create", value_input).then((res) => {
                props.setTasksList((prevArray) => [
                  ...prevArray,
                  res.data.new_task,
                ]);
              });
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
