import React, { FC, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { closex } from "../atoms/Icons";

export interface ModalWrapperProps {
  isShown?: boolean;
  toggleModal: () => void;
  children: JSX.Element;
}

/**
 * Component used for Multiroom aquisition/upgrade/edit and Primary Box aquisition
 */
export const ModalWrapper: FC<ModalWrapperProps> = ({
  isShown,
  toggleModal,
  children,
}) => {
  return createPortal(
    <div
      className={`create-todo-modal-overlay ${isShown ? "fixed" : "hidden"}`}
    >
      <div className="create-todo-modal-wrapper fade-in ">
        <button
          className="fixed text-3xl z-10 right-0 top-0 mt-4 mr-4 md:mt-8 md:mr-8 rounded-full w-8 h-8 md:w-12 md:h-12 text-white bg-green-300 transform hover:bg-navy hover:rotate-180 transition duration-500 ease-in-out"
          onClick={toggleModal}
        >
          {closex}
        </button>
        <div className={"create-todo-modal-inner"}>{children}</div>
      </div>
    </div>,
    document.body
  );
};
