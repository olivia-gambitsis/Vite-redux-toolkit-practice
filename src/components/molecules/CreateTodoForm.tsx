import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addNewTodo } from "../../features/todos/todosSlice";
import { Button } from "../atoms/Button";
import { InputField } from "../atoms/InputField";

export interface ICreateTodoFormProps {}

export const CreateTodoForm = (props: ICreateTodoFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTimeToComplete, setEstimatedTimeToComplete] = useState("");
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
        await dispatch(
          addNewTodo({ name, description, estimatedTimeToComplete })
        ).unwrap();
        setName("");
        setDescription("");
        setEstimatedTimeToComplete("");
      } catch (err) {
        console.error("Failed to save the post: ", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group col-md-6">
            <InputField label={"name"} onChange={onNameChanged} value={name} />
          </div>
          <div className="form-group col-md-6">
            <InputField
              label={"description"}
              onChange={onDescriptionChanged}
              value={description}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-12">
            <InputField
              label={"estimatedHours"}
              onChange={onEstimatedHoursChanged}
              value={estimatedTimeToComplete}
            />
          </div>
        </div>
        <Button type='submit' label='Create'/>
      </form>
    </div>
  );
};
