import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useState, useEffect } from "react";
import ToolBar from "./ToolBar";
import Requests from "../../Functions/Requests";
import ColumnCmp from "./ColumnCmp";
import CreateTask from "./CreateTask";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

export default function ToDoListCmp() {
  const [tasks_list, setTasksList] = useState("");
  const [openCreateTask, setOpenCreateTask] = useState(false);

  const filter = (status) => {
    if (tasks_list) {
      let test = tasks_list.filter((task) => task.status === status);
      return test;
    }
  };

  const status_lists = {
    todo: filter("todo"),
    in_pragress: filter("in_pragress"),
    done: filter("done"),
  };

  let data_user = JSON.parse(localStorage.getItem("data_user"));
  const user_id = data_user["user_id"];
  const user_name = data_user["user_name"];

  useEffect(() => {
    async function tasks_list_useEffect() {
      Requests.get_task_list(user_id).then((res) => {
        setTasksList(res.data.tasks_list);
      });
    }
    tasks_list_useEffect();
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

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

      return;
    }

    const tasks_finish_list = status_lists[finish];

    Requests.post_value("/move", {
      task_id: task.task_id,
      status_task: finish,
    });

    tasks_start_list.splice(source.index, 1);
    tasks_finish_list.splice(destination.index, 0, task);
  };

  let data_cmp = [
    { title: "TODO", status: "todo" },
    {
      title: "IN PROGERESS",
      status: "in_pragress",
    },
    { title: "DONE", status: "done" },
  ];

  return (
    <div className="todo_list_page">
      <DragDropContext onDragEnd={onDragEnd}>
        <ToolBar user_name={user_name} />
        <h1>TO DO LIST</h1>
        {openCreateTask ? (
          <CreateTask
            state_function={{
              setTasksList: setTasksList,
              setOpenCreateTask: setOpenCreateTask,
            }}
            user_id={user_id}
          />
        ) : (
          ""
        )}
        <Fab
          size="small"
          color="secondary"
          aria-label="add"
          onClick={() => {
            setOpenCreateTask(true);
          }}
        >
          <AddIcon />
        </Fab>

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
    // <DragDropContext onDragEnd={onDragEnd}>

    //   <ToolBar user_name={user_name} />
    //   {openCreateTask ? (
    //     <CreateTask
    //       state_function={{
    //         setTasksList: setTasksList,
    //         setOpenCreateTask: setOpenCreateTask,
    //       }}
    //       user_id={user_id}
    //     />
    //   ) : (
    //     ""
    //   )}
    //   <button
    //     onClick={() => {
    //       setOpenCreateTask(true);
    //     }}
    //   >
    //     add
    //   </button>

    //   <div className="Columns_window">
    //     {data_cmp.map((data_column, index) => (
    //       <ColumnCmp
    //         delete={async (task_id) => {
    //           Requests.delete_task(task_id);
    //           let new_tasks_list = tasks_list.filter(
    //             (task) => task.task_id !== task_id
    //           );
    //           setTasksList(new_tasks_list);
    //         }}
    //         move={(task_id, status_task) => {
    //           Requests.post_value("/move", {
    //             task_id: task_id,
    //             status_task: status_task,
    //           }).then((res) => {
    //             const task_found = tasks_list.find(
    //               (task) => task.task_id === task_id
    //             );
    //             task_found.status = res.data.move_to_status;
    //             setTasksList((task_found) => [...task_found]);
    //           });
    //         }}
    //         class_name={`${data_column.status} column`}
    //         status={data_column.status}
    //         title={data_column.title}
    //         key={index}
    //         number={index}
    //         tasks_list={status_lists[data_column.status]}
    //       />
    //     ))}
    //   </div>
    // </DragDropContext>
  );
}
