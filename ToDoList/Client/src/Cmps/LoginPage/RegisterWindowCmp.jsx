import React from "react";
import Requests from "../../Functions/Requests";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& label.Mui-focused": {
      color: "rgb(0, 110, 255)",
    },
    "& .MuiOutlinedInput-root": {
      " &.Mui-focused fieldset": {
        border: "1.5px solid rgb(0, 110, 255)",
      },
    },
  },

}));

export default function RegisterWindowCmp(props) {
  const classes = useStyles();
  const onHandleSubmit = (event) => {
    event.preventDefault();
    let value_input = {
      password: document.querySelector('[name="password"]').value,
      username: document.querySelector('[name="username"]').value,
    };
    Requests.post_value(props.request, value_input).then((res) => {
      if (res.data.user_id) {
        localStorage.setItem(
          "data_user",
          JSON.stringify({
            user_id: res.data.user_id,
            user_name: res.data.user_name,
          })
        );
        window.location.href = "/#/ToDoList";
      } else {
        console.log("operation failed, try again");
      }
    });
  };

  return (
    <section className="register_window">
      <div>
        <h2>{props.title}</h2>
        <form className={classes.root}
          name="form_window"
          action={props.request}
          onSubmit={onHandleSubmit}
        >
          <TextField
            autoComplete="off"
            name="username"
            label="User name"
            id="outlined-margin-normal"
            defaultValue=" "
            margin="normal"
            variant="outlined"
          />
          <TextField
            autoComplete="off"
            name="password"
            label="Password"
            id="outlined-margin-normal"
            defaultValue=" "
            margin="normal"
            variant="outlined"
          />
          <Button variant="contained" type="submit">
            {props.button_name}
          </Button>
        </form>
      </div>
    </section>
  );
}
