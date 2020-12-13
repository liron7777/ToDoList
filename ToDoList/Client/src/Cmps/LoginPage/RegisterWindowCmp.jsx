import React from "react";
import Requests from "../../Functions/Requests";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  textField: {
    width: "30ch",
  },
  root_button: {
    background: "rgb(0, 110, 255)",
    color: "white",
    "&:hover": {
      background: "rgb(8 112 255/85%)",
    },
  },
  // focused: {
  //   "border-color": "red",
  // },
});

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
        <form
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
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />

          <TextField
            autoComplete="off"
            name="password"
            label="Password"
            id="outlined-margin-normal"
            defaultValue=" "
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />

          <Button
            variant="contained"
            type="submit"
            classes={{
              root: classes.root_button,
            }}
          >
            {props.button_name}
          </Button>
        </form>
      </div>
    </section>
  );
}

// border-color
// .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline
