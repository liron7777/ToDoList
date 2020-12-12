import React from "react";
import TaskCmp from "./TaskCmp";
import { Droppable } from "react-beautiful-dnd";
// import Divider from '@material-ui/core/Divider';


export default function ColumnCmp(props) {
  return (
    <section className='column'>
      <h3>{props.title}</h3>
      
      {/* <Divider>CENTER</Divider> */}
      <Droppable droppableId={props.status}>
        {(provided) => (
          <ul
            className={props.class_name}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <div>
              {props.tasks_list
                ? props.tasks_list.map((task, index) => (
                    <TaskCmp
                      key={index}
                      task={task}
                      number={index}
                      unique_id ={index+task.task_id}
                      // unique_id
                      move={(task_id, status_task) => {
                        props.move(task_id, status_task);
                      }}
                      delete={(task_id) => {
                        props.delete(task_id);
                      }}
                    />
                  ))
                : console.log("loadding")}
            </div>
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </section>
  );
}
