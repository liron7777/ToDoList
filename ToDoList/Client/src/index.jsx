import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import "./index.scss";


import ToDoListCmp from "./Cmps/ToDoList/ToDoListCmp";
import RouterFile from "./RouterFile";

ReactDOM.render(
  <React.StrictMode>
    <RouterFile/>
  </React.StrictMode>,
  document.getElementById("root")
);


