import React from "react";
import { Draggable } from "react-beautiful-dnd";

import ClearRoundedIcon from "@material-ui/icons/ClearRounded";

import DoneAllRoundedIcon from "@material-ui/icons/DoneAllRounded";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

export default function TaskCmp(props) {
  const status_task = props.task.status;
  const task_id = props.task.task_id;

  return (
    <Draggable draggableId={`${props.unique_id}`} index={props.number}>
      {(provided) => (
        <li
          className="task_card"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <ClearRoundedIcon
            onClick={() => {
              props.delete(task_id);
            }}
          />
          <span>{props.task.title}</span>
          <span>{props.task.descriptiio}</span>

          <div>
            <span>{props.task.date}</span>
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
          {/* <span>{props.task.date}</span>
         
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
          /> */}
        </li>
      )}
    </Draggable>
  );
}
