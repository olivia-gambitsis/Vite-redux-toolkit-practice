import React, { useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import { useSignUpForm } from "../hooks/useSignUpForm";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  addNewTodo,
  deleteTodo,
  fetchTodos,
} from "../features/todos/todosSlice";
import TodoCard from "../components/TodoCard";
import { CreateTodoForm } from "../components/molecules/CreateTodoForm";
import { InputField } from "../components/atoms/InputField";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const { entities, error, loading } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  if (loading) return <h1>Loading</h1>;

  return (
    <>
    <CreateTodoForm/>
      <div>
        {!loading &&
          entities.map((ent) => (
            <p key={ent.id}>
              {" "}
              <button onClick={() => handleDelete(ent.id)}>delete</button>
              <TodoCard todo={ent} />
            </p>
          ))}
      </div>
    </>
  );
}
