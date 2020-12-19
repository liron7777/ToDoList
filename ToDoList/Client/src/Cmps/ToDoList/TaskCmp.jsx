import React from "react";
import { Draggable } from "react-beautiful-dnd";

import ClearRoundedIcon from "@material-ui/icons/ClearRounded";

import DoneAllRoundedIcon from "@material-ui/icons/DoneAllRounded";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

// import styled from 'styled-components'

import { makeStyles } from "@material-ui/core/styles";

// const test = styled.div`border: rgb(216, 216, 216) solid 1px;`

const useStyles = makeStyles((theme) => ({
  root_icon: {
    display: "inline-block",
  },
}));

export default function TaskCmp(props) {
  const classes = useStyles();
  const status_task = props.task.status;
  const task_id = props.task.task_id;
  const change_color_of_item = (isDragging, task_id) => {
    if (isDragging) {
      document.getElementById(task_id).classList.add("isdragging");
      document.getElementById(task_id).classList.remove("isnotdragging");
    } else {
      if (document.querySelector(`#${task_id}`)) {
        document.getElementById(task_id).classList.remove("isdragging");
        document.getElementById(task_id).classList.add("isnotdragging");
      }
    }
  };

  return (
    <Draggable draggableId={`${props.unique_id}`} index={props.number}>
  
      {(provided, snapshot) => (
        <li
          id={task_id}
          className="task_card isnotdragging"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isdragging={change_color_of_item(snapshot.isDragging, task_id)}
        >
          <div className="content">
            <div className="title_and_delete">
              <span>{props.task.title}</span>
              <ClearRoundedIcon
                className={classes.root_icon}
                onClick={() => {
                  props.delete(task_id);
                }}
              />
            </div>
            <span>{props.task.descriptiio}</span>
            <div className="data_and_action_icons">
              <span id="date">{props.task.date}</span>
              <div className={classes.root_icon}>
                <DoneAllRoundedIcon
                  onClick={() => {
                    props.move(task_id, "done");
                  }}
                />
                <ArrowForwardIcon
                  onClick={() => {
                    let value_status = "";
                    switch (status_task) {
                      case "todo":
                        value_status = "in_pragress";
                        break;
                      case "in_pragress":
                        value_status = "done";
                        break;
                      case "done":
                        value_status = "todo";
                    }
                    props.move(task_id, value_status);
                  }}
                />
              </div>
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
}

{
}
