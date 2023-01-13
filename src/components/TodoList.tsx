import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { todo, todoData } from "../fakeData";
import TodoCard from "./TodoCard";
import Switch from "./atoms/Switch";
import { FilterListIcon } from "./atoms/Icons";
import Filters from "./molecules/Filters";
import { useAppDispatch } from "../app/hooks";
import {
  deleteTodo,
  fetchTodos,
  updateTodo,
} from "../features/todos/todosSlice";
import { useTodosList } from "../helpers/useTodosList";

export interface ITodoListProps {
  todos: todo[];
}

export default function TodoList({ todos }: ITodoListProps) {
  const [todosList, setTodoList] = useState(todos);
  const [showFilters, setShowFilters] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showUnfinished, setShowUnfinished] = useState(false);
  const [listToShow, setListToShow] = useState(todos)
  const { completedTodos, unfinishedTodos } = useTodosList();

  const dispatch = useAppDispatch();

  const getOrder = () => {
    todosList.forEach((todo, index) => (todo.orderIndex = index));
    todosList.forEach((todo) => dispatch(updateTodo(todo)));
  };

  const handleShowCompleted = () =>{
    setShowCompleted(!showCompleted)
    if(showUnfinished){
      setShowUnfinished(false)
    }
  }

  const handleShowUnfinished = () =>{
    setShowUnfinished(!showUnfinished)
    if(showCompleted){
      setShowCompleted(false)
    }
  }


  useEffect(() => {
    setTodoList(todos);
  }, [todos]);

  useEffect(() =>{
    if(showCompleted){
      setListToShow(completedTodos)
    }else if(showUnfinished){
      setListToShow(unfinishedTodos)
    }else{
      setListToShow(todos)
    }
  }, [showCompleted, showUnfinished, todos])

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const items = Array.from(todos);
    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);
    setTodoList(items);
    getOrder();
  };

  return (
    <div className=" text-green-300 p-4 m-8">
      <button onClick={() => setShowFilters(!showFilters)}>
        <FilterListIcon />
      </button>
      {showFilters && <Filters setShowCompleted={handleShowCompleted} setShowUnfinished={handleShowUnfinished} showCompleted={showCompleted} showUnfinished={showUnfinished} />}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <ul
              className="flex flex-col gap-4"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {listToShow.map((todo, index) => (
                <TodoCard key={todo.id} todo={todo} index={index} />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
