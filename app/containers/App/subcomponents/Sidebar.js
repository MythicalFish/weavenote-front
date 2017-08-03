import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Button = (props) => {
  const { path, currentPath, label } = props;
  if (!currentPath) return null;
  const bClass = buttonClass(path, currentPath);
  return (
    <Link className={bClass} to={path}>
      {label}
    </Link>
  );
};

function isProjectPage(path) {
  const r = /\/projects{1}\/[0-9]+/;
  return r.test(path);
}

function buttonClass(path, currentPath) {
  const p1 = path.split('/')[1];
  const p2 = currentPath.split('/')[1];
  if (p1 === p2) return 'active';
  return null;
}

Button.propTypes = {
  label: React.PropTypes.string.isRequired,
  path: React.PropTypes.string.isRequired,
  currentPath: React.PropTypes.string,
};

const Sidebar = (props) => {
  if (isProjectPage(props.currentPath)) return null;
  return (
    <aside id="sidebar">
      <header>Weavenote</header>
      <nav>
        <Button {...props} path="/projects" label="Projects" />
        <Button {...props} path="/materials" label="Materials" />
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  currentPath: PropTypes.string,
};

export default Sidebar;
