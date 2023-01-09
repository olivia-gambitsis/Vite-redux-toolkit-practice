import React from "react";
import { Link, Outlet } from "react-router-dom";

export interface INavBarProps {}

const NavBar: React.FunctionComponent<INavBarProps> = (props) => {
  return (
    <div className="w-full h-12 flex flex-row items-center border bg-green-500 text-white">
      <Link className="text-white text-lg mr-auto ml-5" to="/">
        Home
      </Link>
      <ul className="flex flex-row gap-10">
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/something">Something</Link>
        </li>
        <li>
          <Link to="/something-else">Something else</Link>
        </li>
      </ul>
      <div className="ml-auto mr-5">
        <h2>Hello Olivia</h2>
      </div>
    </div>
  );
};

export default NavBar;
