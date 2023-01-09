import React, { useState } from "react";

export interface IInputFieldProps {
  label: string;
	value: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = ({ label, onChange, value, type}: IInputFieldProps) => {
		
  return (
    <div className="input-container">
      <input type={type} className="input" value={value} onChange={onChange} />
      <label htmlFor={label} className="label">
        <div className="text">{label}</div>
      </label>
    </div>
  );
};
