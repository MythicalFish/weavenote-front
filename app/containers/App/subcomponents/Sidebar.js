import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Button = (props) => {
  const { path, location, label } = props;
  if (!location) return null;
  const bClass = buttonClass(path, location.pathname);
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

const exposeTo = (role) => !['None', 'Guest'].includes(role);

const Sidebar = (props) => {
  if (isProjectPage(props.location.pathname)) return null;
  const role = props.user.get('role');
  if (!role) return null;
  return (
    <aside id="sidebar">
      <img src={`${process.env.ASSET_HOST}/logo.png`} role="presentation" />
      <nav className="mt2">
        <Button {...props} path="/projects" label="Projects" />
        {exposeTo(role) && (
          <Button {...props} path="/materials" label="Materials" />
        )}
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  location: PropTypes.object,
  user: PropTypes.object,
};

Button.propTypes = {
  location: PropTypes.object,
};

export default Sidebar;
