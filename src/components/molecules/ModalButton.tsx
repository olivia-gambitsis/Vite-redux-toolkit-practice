import * as React from "react";
import { CreateTodoForm, todoFormTypes } from "./CreateTodoForm";
import { useModal } from "../../helpers/useModal";
import { todo } from "../../fakeData";
import { Button } from "../atoms/Button";
import { EditIcon } from "../atoms/Icons";

export interface IModalButtonProps {
  type: todoFormTypes;
  todo?: todo;
}

export default function ModalButton({ type, todo }: IModalButtonProps) {
  const { showModal, toggleModal } = useModal();
  return (
    <div>
      {type === todoFormTypes.Create ? (
        <Button type="button" label="NEW TODO" onClick={toggleModal} />
      ) : (
        <button
          className="absolute -top-12 right-1 rounded-full bg-light-green p-2"
          onClick={toggleModal}
        >
          <EditIcon />
        </button>
      )}

      {showModal && <CreateTodoForm toggleModal={toggleModal} type={type} editingTodo={todo} />}
    </div>
  );
}
