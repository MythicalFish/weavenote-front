import React from 'react';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import Dropdown from 'components/Dropdown';
import Thumbnail from 'components/Thumbnail';

export default function ListItem(props) {
  const { project, fileProject } = props;
  const { id, archived } = project;
  const url = `/projects/${id}`;
  const linked = {
    onClick: () => browserHistory.push(url),
    className: 'cursor-pointer',
  };
  return (
    <tr>
      <td {...linked}>
        <Thumbnail url={project.thumbnail_url} />
      </td>
      <td {...linked}>
        {project.name}
      </td>
      <td {...linked}>
        #{project.identifier}
      </td>
      <td {...linked}>.</td>
      <td {...linked}>.</td>
      <td className="smaller1 upcase">
        {project.stage.label}
      </td>
      <td>collaborators</td>
      <td>
        <div className="dark5 flex items-end">
          <Dropdown icon="MoreHorizontal">
            <Link to={url}>Manage</Link>
            <button onClick={() => fileProject({ id, archived: !archived })}>
              {archived ? 'Restore' : 'Archive'}
            </button>
          </Dropdown>
        </div>
      </td>
    </tr>
  );
}

ListItem.propTypes = {
  project: React.PropTypes.object.isRequired,
  fileProject: React.PropTypes.func,
};
