import { useState } from "react";
import { useAppSelector } from "../app/hooks";

export const useTodosList = () => {
  const { entities } = useAppSelector((state) => state.todos);

  const completedTodos = () => {
    entities.filter((ent) => ent.completed);
  };

  const unfinishedTodos = () => {
    entities.filter((ent) => !ent.completed);
  };

  return {
    completedTodos,
    unfinishedTodos
  };
};
