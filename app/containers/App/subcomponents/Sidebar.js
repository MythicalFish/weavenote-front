import React from 'react';
import { Link } from 'react-router';

function Button(props) {
  const { path, currentPath, label } = props;
  if (!currentPath) return null;
  let c;
  const p1 = path.split('/')[1];
  const p2 = currentPath.split('/')[1];
  if (p1 === p2) {
    c = `${c} active`;
  }
  return (
    <li>
      <Link className={c} to={path}>
        {label}
      </Link>
    </li>
  );
}

Button.propTypes = {
  label: React.PropTypes.string.isRequired,
  path: React.PropTypes.string.isRequired,
  currentPath: React.PropTypes.string,
};

class Sidebar extends React.PureComponent {
  render() {
    const { props } = this;
    return (
      <aside id="sidebar" className="vh-ymin100 bg-color1x light9 br1">
        <div className="pr4">
          <header className="bigger3 px4 pt3 pb2 bold">Seamless</header>
        </div>
        <ul className="m0 p0">
          <Button {...props} path="/" label="Dashboard" />
          <Button {...props} path="/projects" label="Projects" />
          <Button {...props} path="/materials" label="Materials" />
          <Button {...props} path="/contacts" label="Contacts" />
        </ul>
      </aside>
    );
  }
}

Sidebar.propTypes = {};

export default Sidebar;
