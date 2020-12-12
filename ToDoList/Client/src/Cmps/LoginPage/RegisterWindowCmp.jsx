import React from "react";
import Requests from "../../Functions/Requests";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root_button: {
    background: "rgb(0, 110, 255)",
    color: "white",
    "&:hover": {
      background: "rgb(8 112 255/85%)",
    },
  },
  root_input: {
    width: "250px",
  },
  underline: {
    "&:after": {
      "border-bottom": "1px solid rgb(8 112 255/85%)",
    },
  },
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
          <Input
            autoComplete="off"
            name="username"
            placeholder="User name"
            inputProps={{ "aria-label": "description" }}
            classes={{
              root: classes.root_input,
              underline: classes.underline,
            }}
          />
          {/* <input type="text" placeholder="User name" name="username" /> */}
          <Input
            autoComplete="off"
            name="password"
            placeholder="Password"
            inputProps={{ "aria-label": "description" }}
            classes={{
              root: classes.root_input,
              underline: classes.underline,
            }}
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
