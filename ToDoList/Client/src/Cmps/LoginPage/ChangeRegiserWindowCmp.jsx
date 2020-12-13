import React from "react";
import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles({
//   button_center: {
//     "text-align": "center",
//     background: "rgb(0, 110, 255)"
//   },
// });

export default function ChangeRegiserWindowCmp(props) {
  // const classes = useStyles();
  return (
    <section className="change_regiser_window">
      <div>
        <h2>Hello, Friend!</h2>
        <span>{props.text_window}</span>
        <Button
        //  classes={{
        //   root: classes.button_center
        // }}
          variant="outlined"
          color="inherit"
          onClick={() => {
            props.changeButton();
          }}
        >
          {props.button_name}
        </Button>
      </div>
    </section>
  );
}
