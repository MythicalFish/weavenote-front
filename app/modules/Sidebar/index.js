import React from 'react';
import Button from './Button';

class Sidebar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <aside id="sidebar" className="vh-ymin100 bg-color1x light9">
        <header className="larger1 py3 px4 bold">
          Seamless
        </header>
        <ul className="m0 p0">
          <Button path="/" label="Dashboard" />
          <Button path="/projects" label="Projects" />
          <Button path="/conversations" label="Conversations" />
          <Button path="/materials" label="Materials" />
          <Button path="/contacts" label="Contacts" />
        </ul>
      </aside>
    );
  }
}

Sidebar.propTypes = {

};

export default Sidebar;
