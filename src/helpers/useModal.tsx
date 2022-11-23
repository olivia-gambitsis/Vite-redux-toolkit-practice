import { useState } from 'react';

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  return {
    showModal,
    toggleModal,
  };
};