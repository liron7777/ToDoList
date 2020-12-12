import React from "react";
import Button from "@material-ui/core/Button";


export default function ChangeRegiserWindowCmp(props) {
  return (
    <section className="change_regiser_window">
      <div>
        <h2>Hello, Friend!</h2>
        <span>{props.text_window}</span>
        <Button 
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
