import React from "react";
import Switch from "../atoms/Switch";

export interface IFiltersProps {
  setShowCompleted: () => void;
  setShowUnfinished: () => void;
  showUnfinished: boolean;
  showCompleted: boolean;
}

export default function Filters({
  setShowCompleted,
  setShowUnfinished,
  showCompleted,
  showUnfinished,
}: IFiltersProps) {
  return (
    <div className="flex flex-col gap-4 w-full justify-between items-end mb-5">
      <Switch
        onChange={setShowUnfinished}
        value={showUnfinished}
        label={"Show unfinished only"}
      />
      <Switch
        onChange={setShowCompleted}
        value={showCompleted}
        label={"Show completed only"}
      />
    </div>
  );
}
