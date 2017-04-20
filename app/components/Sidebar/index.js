import React from 'react';
import Button from './Button';

class Sidebar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <aside className="vh-ymin100 bg-gray-darker light9">
        <header className="larger1 py3 px4">
          Seamless
        </header>
        <ul className="m0 p0">
          <Button path="/" label="Dashboard" />
          <Button path="/projects" label="Projects" />
        </ul>
      </aside>
    );
  }
}

Sidebar.propTypes = {

};

export default Sidebar;
