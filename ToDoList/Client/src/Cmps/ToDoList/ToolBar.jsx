import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root_tool_bar: {
    background: "rgb(0, 110, 255)",
  },

  logout: {
    "&:hover": {
      color: "red",
      content: "LOGOUT",
    },
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function ToolBar(props) {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar
        classes={{
          regular: classes.root_tool_bar,
        }}
      >
        <Button
          onClick={() => {
            window.location.href = "/#/";
          }}
          classes={{
            // root: classes.name_user,
            label: classes.logout,
          }}
          className="logout"
          color="inherit"
        >
          {props.user_name}
        </Button>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              regular: classes.regular,
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </Toolbar>
    </AppBar>

    // <header>
    //   <div>Logo</div>
    //   <input
    //     type="text"
    //     placeholder="Search ..."
    //     name="search_bar"
    //     // onKeyDown={handle_key_down}
    //   />
    //   {/* <span>test</span> */}
    //   <span>{props.user_name}</span>
    //   <div
    // onClick={() => {
    //   window.location.href = "/#/";
    // }}
    //   >
    //     logout
    //   </div>
    // </header>
  );
}
