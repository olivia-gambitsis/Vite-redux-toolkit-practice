import React, { useState } from "react";

export interface IInputFieldProps {
  label: string;
	value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = ({ label, onChange, value}: IInputFieldProps) => {
		
  return (
    <div className="input-container">
      <input type="text" className="input" value={value} onChange={onChange} />
      <label htmlFor={label} className="label">
        <div className="text">{label}</div>
      </label>
    </div>
  );
};
