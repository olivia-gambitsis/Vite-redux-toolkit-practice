import * as React from "react";
import Switch from "../atoms/Switch";

export interface IFiltersProps {}

export default function Filters(props: IFiltersProps) {
  return (
    <div className="flex flex-col gap-4 w-full justify-between items-end mb-5">
      <Switch onChange={() => null} value={true} label={'Show unfinished only'} />
      <Switch onChange={() => null} value={true} label={'Show completed'} />
      <Switch onChange={() => null} value={true} label={'Show unfinished only'} />
    </div>
  );
}
