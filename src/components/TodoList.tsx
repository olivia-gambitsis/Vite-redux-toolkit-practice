import React, { useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { todo, todoData } from "../fakeData";
import TodoCard from "./TodoCard";
import Switch from "./atoms/Switch";
import { FilterListIcon } from "./atoms/Icons";
import Filters from "./molecules/Filters";
import { useAppDispatch } from "../app/hooks";
import { deleteTodo, updateTodo } from "../features/todos/todosSlice";

export interface ITodoListProps {
  todos: todo[];
}

export default function TodoList({todos}: ITodoListProps) {
  const [todosList, setTodoList] = useState(todos);
  const [switchOn, setTurnOn] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showUnfinished, setShowUnfinished] = useState(false);

  const dispatch = useAppDispatch();
  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const getOrder = () =>{
    const newListOrder = todosList.forEach(( todo, index) => todo.orderIndex = index);
    dispatch(updateTodo)
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const items = Array.from(todos);
    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);
    setTodoList(items);
    getOrder();
    const handleDelete = (id: string) => {
      dispatch(deleteTodo(id));
    };
    
  };

  return (
    <div className=" text-green-300 p-4 m-8">
      <button onClick={() => setShowFilters(!showFilters)}>
        <FilterListIcon />
      </button>
      {showFilters && <Filters/>}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <ul
              className="flex flex-col gap-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todosList.map((todo, index) => (
                <TodoCard key={todo.id} todo={todo} index={index} handleDelete={handleDelete} />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
