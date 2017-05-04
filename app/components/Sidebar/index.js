import React from 'react';
import Button from './Button';

class Sidebar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { props } = this;
    return (
      <aside id="sidebar" className="vh-ymin100 bg-color1x light9">
        <div className="pr4">
          <header className="bigger3 px4 pt3 pb2 bold">
            Seamless
          </header>
        </div>
        <ul className="m0 p0">
          <Button {...props} path="/" label="Dashboard" />
          <Button {...props} path="/projects" label="Projects" />
          <Button {...props} path="/conversations" label="Conversations" />
          <Button {...props} path="/materials" label="Materials" />
          <Button {...props} path="/contacts" label="Contacts" />
        </ul>
      </aside>
    );
  }
}

Sidebar.propTypes = {

};

export default Sidebar;
