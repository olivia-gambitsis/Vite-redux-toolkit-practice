import * as React from "react";
import { CopyrightIcon } from "./atoms/Icons";

export interface IFooterProps {}

export default function Footer(props: IFooterProps) {
  return (
    <footer className="w-full h-12 bg-independence mt-20 bottom-0">
      <div className=" flex flex-row w-full justify-end h-full items-center">
        <CopyrightIcon />
        <span className="text-light-green"> OGeeZus 2022</span>
      </div>
    </footer>
  );
}
