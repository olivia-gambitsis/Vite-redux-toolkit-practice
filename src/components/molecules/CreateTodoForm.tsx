import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addNewTodo, updateTodo } from "../../features/todos/todosSlice";
import { Button } from "../atoms/Button";
import { InputField } from "../atoms/InputField";
import { ModalWrapper } from "./ModalWrapper";
import { todo } from "../../fakeData";

export enum todoFormTypes {
  Create = "CREATE",
  Edit = "EDIT",
}

export interface ICreateTodoFormProps {
  toggleModal: () => void;
  type: todoFormTypes;
  editingTodo?: todo;
}

export const CreateTodoForm = ({
  toggleModal,
  type,
  editingTodo,
}: ICreateTodoFormProps) => {
  const [name, setName] = useState(
    type === todoFormTypes.Edit && editingTodo ? editingTodo.name : ""
  );
  const [description, setDescription] = useState(
    type === todoFormTypes.Edit && editingTodo ? editingTodo.description : ""
  );
  const [estimatedTimeToComplete, setEstimatedTimeToComplete] = useState(
    type === todoFormTypes.Edit && editingTodo
      ? editingTodo.estimatedTimeToComplete
      : ""
  );
  const [addRequestStatus, setAddRequestStatus] = useState("idle");


  const onNameChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const onDescriptionChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setDescription(e.target.value);
  const onEstimatedHoursChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEstimatedTimeToComplete(e.target.value);

  const canAddTodo = addRequestStatus === "idle";
  const { entities, error, loading } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (canAddTodo) {
      try {
        setAddRequestStatus("pending");
        if (type === todoFormTypes.Edit && editingTodo) {
          await dispatch(
            updateTodo({ id: editingTodo.id, name, description, estimatedTimeToComplete })
          ).unwrap()
        } else {
          await dispatch(
            addNewTodo({ name, description, estimatedTimeToComplete })
          ).unwrap()
        }
        // setName("");
        // setDescription("");
        // setEstimatedTimeToComplete("");
        toggleModal();
      } catch (err) {
        console.error("Failed to save the post: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <>
      <ModalWrapper toggleModal={toggleModal} isShown={true}>
        <>
          <div className="mx-5 lg:mx-56 mt-12 gap-12 text-navy flex flex-col last:mb-12">
            <h1 className="text-center text-h5 text-lavender-floral">
              {type === todoFormTypes.Create ? "Create Todo" : "Edit Todo"}
            </h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <InputField
                label={"name"}
                onChange={onNameChanged}
                value={name}
                type="text"
              />
              <InputField
                label={"description"}
                onChange={onDescriptionChanged}
                value={description}
                type="text"
              />
              <InputField
                label={"Time to complete (mins)"}
                onChange={onEstimatedHoursChanged}
                value={estimatedTimeToComplete}
                type="number"
              />

              <Button
                type="submit"
                label={type === todoFormTypes.Create ? "CREATE" : "EDIT"}
              />
            </form>
          </div>
        </>
      </ModalWrapper>
    </>
  );
};
