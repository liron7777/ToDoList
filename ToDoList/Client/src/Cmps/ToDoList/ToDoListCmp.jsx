import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useState, useEffect } from "react";

//                           Import - Cmps

import ToolBar from "./ToolBar";
import Requests from "../../Functions/Requests";
import ColumnCmp from "./ColumnCmp";

//                           Import - Material

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Create_Task from "./Create_Task";

export default function ToDoListCmp() {
  //                           Use State

  const [tasks_list, setTasksList] = useState("");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  //                           Filter function

  const filter = (status) => {
    if (tasks_list) {
      let list_status = tasks_list.filter((task) => task.status === status);
      if (search === "") {
        return list_status;
      } else {
        return list_status.filter((task) => task.title === search);
      }
    }
  };

  //                           Setting Variables

  const status_lists = {
    todo: filter("todo"),
    in_pragress: filter("in_pragress"),
    done: filter("done"),
  };

  const data_user = JSON.parse(localStorage.getItem("data_user")),
    user_id = data_user["user_id"],
    user_name = data_user["user_name"];

  const data_cmp = [
    { title: "TODO", status: "todo" },
    {
      title: "IN PROGERESS",
      status: "in_pragress",
    },
    { title: "DONE", status: "done" },
  ];

  //                           Use Effect

  useEffect(() => {
    async function tasks_list_useEffect() {
      Requests.get_task_list(user_id).then((res) => {
        setTasksList(res.data.tasks_list);
      });
    }
    tasks_list_useEffect();
  }, []);
  //                           On drag end function

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    // console.log(result);
    // console.log('list', source.droppableId);
    // console.log('list2', );
    // console.log(draggableId);
    // console.log("draggableId.substring(1)", draggableId.substring(1));
    const task = tasks_list.find(
      (task) => task.task_id === draggableId.substring(1)
    );
  
    if (!destination) {
      return;
    }
    if (
      destination.droppableId == source.droppableId &&
      destination.index == source.index
    ) {
      return;
    }
    const start = source.droppableId;
    const finish = destination.droppableId;
    const tasks_start_list = status_lists[start];
    if (start === finish) {
      tasks_start_list.splice(source.index, 1);
      tasks_start_list.splice(destination.index, 0, task);
      let unchanged_list = tasks_list.filter((task) => task.status != finish);
      let new_list = unchanged_list.concat(tasks_start_list);
      setTasksList(new_list);
      Requests.post_change_list({ user_id: task.user_id, new_list: new_list });
      return;
    }

    const tasks_finish_list = status_lists[finish];
    task.status = finish;
    tasks_start_list.splice(source.index, 1);
    tasks_finish_list.splice(destination.index, 0, task);
    let unchanged_list = tasks_list.filter(
      (task) => task.status != finish && task.status != start
    );
    let new_list = unchanged_list.concat(tasks_start_list, tasks_finish_list);
    setTasksList(new_list);
    Requests.post_change_list({ user_id: task.user_id, new_list: new_list });
  };

  //                           RETURN

  return (
    <div className="todo_list_page">
      <DragDropContext onDragEnd={onDragEnd}>
        <ToolBar user_name={user_name} setsearch={setSearch} />
        <div className="title_and_add">
          <h1>TO DO LIST</h1>
          <div>
            <Fab
              size="small"
              color="secondary"
              aria-label="add"
              onClick={() => {
                setOpen(true);
              }}
            >
              <AddIcon />
            </Fab>
            {open ? (
              <Create_Task
                setOpen={setOpen}
                user_id={user_id}
                setTasksList={setTasksList}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="columns_window">
          {data_cmp.map((data_column, index) => (
            <ColumnCmp
              delete={async (task_id) => {
                Requests.delete_task(task_id);
                let new_tasks_list = tasks_list.filter(
                  (task) => task.task_id !== task_id
                );
                setTasksList(new_tasks_list);
              }}
              move={(task_id, status_task) => {
                Requests.post_value("/move", {
                  task_id: task_id,
                  status_task: status_task,
                }).then((res) => {
                  const task_found = tasks_list.find(
                    (task) => task.task_id === task_id
                  );
                  task_found.status = res.data.move_to_status;
                  setTasksList((task_found) => [...task_found]);
                });
              }}
              class_name={`${data_column.status} column`}
              status={data_column.status}
              title={data_column.title}
              key={index}
              number={index}
              tasks_list={status_lists[data_column.status]}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
