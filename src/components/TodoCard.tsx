import React, { CSSProperties } from "react";
import { useState } from "react";
import { todo, todoData } from "../fakeData";
import {
  CheckIcon,
  DeleteIcon,
  DownCaret,
  EditIcon,
  MenuIcon,
  UncheckIcon,
  UpCaret,
} from "./atoms/Icons";
import { CreateTodoForm, todoFormTypes } from "./molecules/CreateTodoForm";
import ModalButton from "./molecules/ModalButton";
import { Draggable } from "react-beautiful-dnd";
import { useAppDispatch } from "../app/hooks";
import { deleteTodo, toggleComplete, updateTodo } from "../features/todos/todosSlice";

export interface ITodoCardProps {
  todo: todo;
  index: number;
}

export default function TodoCard({ todo, index }: ITodoCardProps) {
  const [completed, setCompleted] = useState(todo.isComplete ?? false);
  const [showDetails, setShowDetails] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useAppDispatch()

  const handleCompleteTodo = (todo: todo) =>{
    dispatch(updateTodo({
      ...todo, isComplete: !completed
    }))
    setCompleted(!completed)
  }


  return (
    <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          className={`hover:bg-cyber-grape rounded-md drop-shadow-md flex flex-col p-6 relative bg-lavender-floral ${snapshot.isDragging ? "bg-cyber-grape" : "bg-lavender-floral"} `}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className=" flex flex-row gap-4 items-center justify-between">
            <div className="flex flex-row items-center gap-4 ">
              <div onClick={() => handleCompleteTodo(todo)}>
                {" "}
                {completed ? <CheckIcon /> : <UncheckIcon />}
              </div>
              <h3 className={`${completed ? 'line-through' : ''}`}>{todo.name}</h3>
            </div>
            <div
              className="flex items-center text-white"
              onClick={() => setShowDetails(!showDetails)}
            >
              Details {showDetails ? <DownCaret /> : <UpCaret />}{" "}
            </div>
          </div>
          <div
            className={`${
              showDetails ? "h-auto" : "h-0"
            } overflow-hidden flex flex-col gap-1`}
          >
            <p className="text-white">
              More details:{" "}
              <span className="text-light-green">{todo.description}</span>{" "}
            </p>
            <p className="text-white">
              Estimated time to complete:{" "}
              <span className="text-light-green">
                {" "}
                {todo.estimatedTimeToComplete}
              </span>{" "}
              minutes
            </p>
          </div>
          <button
            className="absolute top-2 right-2"
            onClick={() => setShowOptions(!showOptions)}
          >
            <MenuIcon />
          </button>

          <div className={`${showOptions ? "block" : "hidden"}`}>
            <button
              className="absolute top-2 -right-12 rounded-full bg-light-green p-2"
              onClick={() => dispatch(deleteTodo(todo.id)) }
            >
              <DeleteIcon />
            </button>
            <ModalButton type={todoFormTypes.Edit} todo={todo} />
          </div>
        </div>
      )}
    </Draggable>
  );
}
