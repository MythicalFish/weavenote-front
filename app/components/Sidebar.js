import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Logo from 'images/logo-s.svg';
import OrgSwitch from 'components/OrgSwitch';

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
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

const exposeTo = (role) => !['None', 'Guest'].includes(role);

const Sidebar = (props) => {
  if (!props.location) return null;
  if (isProjectPage(props.location.pathname)) return null;
  const role = props.user.getIn(['role_type', 'name']);
  if (!role) return null;
  return (
    <aside
      id="sidebar"
      className="flex-none blurrable flex flex-column justify-between"
    >
      <div>
        <img src={Logo} role="presentation" className="x4" />
        <nav className="mt2">
          <Button {...props} path="/projects" label="Projects" />
          {exposeTo(role) && (
            <Button {...props} path="/materials" label="Materials" />
          )}
        </nav>
      </div>
      <div>
        <OrgSwitch {...props} />
      </div>
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
