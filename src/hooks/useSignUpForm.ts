import React, { useState } from "react";

interface ITask {
  name: string;
  description: string;
  estimatedHours: number;
}
type callback = () => void;

export const useSignUpForm = (callback: callback) => {
  const [inputs, setInputs] = useState<ITask>({ name: '', description: '', estimatedHours: 0});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    if (e) e.preventDefault();
    callback();
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.value);
    setInputs({...inputs, [e.target.name]: e.target.value});
  };

  return {
    handleSubmit,
    handleInputChange,
    inputs,
  };
};
