import React from "react";
import { todoData } from "../fakeData";

export interface ITodoListProps {
  
}

export default function TodoList(props: ITodoListProps) {
  return (
    <div className="border text-green-300 p-4 m-8">
      <ul className="divide-y-2">
        {todoData.map((todo) => (
          <li key={todo.id}>
            
          </li>
        ))}
      </ul>
    </div>
  );
}
