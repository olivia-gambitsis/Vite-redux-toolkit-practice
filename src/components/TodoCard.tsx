import React from "react";
import { useState } from "react";
import { todo, todoData } from "../fakeData";
import { CheckIcon, DownCaret, UncheckIcon, UpCaret } from "./atoms/Icons";

export interface ITodoCardProps {
  todo: todo;
}

export default function TodoCard({ todo }: ITodoCardProps) {
  const [completed, setCompleted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="border rounded-md bg-white drop-shadow-md flex flex-col p-4">
      <div className=" flex flex-row gap-4 text-orange-600 items-center w-40">
        <div onClick={() => setCompleted(!completed)}>
          {" "}
          {completed ? <CheckIcon /> : <UncheckIcon />}
        </div>
        <h3>{todo.name}</h3>
        <p>{todo.estimatedTimeToComplete}</p>
      </div>
        <p className={` text-purple-600 ${showDetails ? "block" : "hidden"}`}>
          {todo.description}
        </p>
      <div onClick={() => setShowDetails(!showDetails)}>Details {showDetails ? <DownCaret/> : <UpCaret/>} </div>
    </div>
  );
}
