import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import Dropdown from 'components/Dropdown';
import Thumbnail from 'components/Thumbnail';
import AvatarList from 'components/AvatarList';
import confirm from 'utils/confirm';

export default function ListItem(props) {
  const { project, fileProject, deleteProject, abilities } = props;
  const id = project.get('id');
  const archived = project.get('archived');
  const url = `/projects/${id}`;
  const linked = {
    onClick: () => browserHistory.push(url),
    className: 'cursor-pointer',
  };
  const handleDelete = () => {
    confirm('Are you sure you want to delete this project?').then(() => {
      deleteProject(id);
    });
  };
  const handleDuplicate = () => {
    const { duplicateProject } = props;
    duplicateProject(props.project.get('id'));
  };
  return (
    <tr>
      <td {...linked} className="cell-fit">
        <Thumbnail url={project.get('thumbnail_url')} />
      </td>
      <td {...linked}>{project.get('name')}</td>
      <td {...linked}>{project.get('ref_number')}</td>
      <td {...linked}>{project.get('collection')}</td>
      <td {...linked}>{project.get('color_code')}</td>
      <td>
        <AvatarList
          collaborators={project.get('all_collaborators')}
          readOnly
          {...props}
        />
      </td>
      <td className="pl0 cell-fit">
        <div className="flex items-end">
          {abilities.update && (
            <Dropdown icon="more">
              <Link to={url}>Manage</Link>
              <button onClick={() => fileProject({ id, archived: !archived })}>
                {archived ? 'Restore' : 'Archive'}
              </button>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={handleDuplicate}>Duplicate</button>
            </Dropdown>
          )}
        </div>
      </td>
    </tr>
  );
}

ListItem.propTypes = {
  project: PropTypes.object.isRequired,
  fileProject: PropTypes.func,
  deleteProject: PropTypes.func,
  duplicateProject: PropTypes.func,
  abilities: PropTypes.object,
};
