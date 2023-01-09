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
import { CreateTodoForm, todoFormTypes } from "../components/molecules/CreateTodoForm";
import { InputField } from "../components/atoms/InputField";
import { useModal } from "../helpers/useModal";
import { Button } from "../components/atoms/Button";
import ModalButton from "../components/molecules/ModalButton";

export interface IHomeProps {}

export default function Home(props: IHomeProps) {

  
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  
  const { entities, error, loading } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  
  if (loading) return <h1>Loading</h1>;

  // <h1 className="text-h1 text-light-green">TODOS</h1>
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center pt-8">
        { entities.length > 0 && <TodoList todos={entities} />}
        <ModalButton type={todoFormTypes.Create}/>
      </div>
    </>
  );
}
