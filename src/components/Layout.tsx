import React from 'react';
import { Outlet } from 'react-router-dom';

export interface ILayoutComponentProps {}

const LayoutComponent: React.FunctionComponent<ILayoutComponentProps> = (props) => {
  return (
    <div style={{ border: 2, padding: 2, borderColor: 'black', borderStyle: 'dashed', margin: 5, width: 500, height: 500 }}>
      <div>

			</div>
      <Outlet />
    </div>
  );
};

export default LayoutComponent;