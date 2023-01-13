import React, { useState } from "react";

export interface ISwitchProps {
  onChange: () => void;
  value: boolean;
  label: string;
}

export default function Switch({ onChange, value, label }: ISwitchProps) {

  return (
    <div className="flex flex-row gap-2 items-center w-full justify-between">
      <h5>{label}</h5>
      <button
        className={`rounded-full w-9 h-4 relative ${
          value ? "bg-lavender-floral" : " bg-gray-500"
        }`}
        onClick={onChange}
      >
        <div
          className={`rounded-full w-5 h-5 absolute z-10 -top-[2px] ${
            value ? "right-0 bg-apricot" : "left-0 bg-white "
          }`}
        ></div>
      </button>
    </div>
  );
}
