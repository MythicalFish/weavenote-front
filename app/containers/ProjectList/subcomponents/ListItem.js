import React from 'react';
import { Link, browserHistory } from 'react-router';
import Dropdown from 'components/Dropdown';
import Thumbnail from 'components/Thumbnail';
import AvatarList from 'components/AvatarList';
import confirm from 'utils/confirm';

export default function ListItem(props) {
  const { project, fileProject, deleteProject } = props;
  const id = project.get('id');
  const archived = project.get('archived');
  const url = `/projects/${id}`;
  const linked = {
    onClick: () => browserHistory.push(url),
    className: 'cursor-pointer',
  };
  return (
    <tr>
      <td {...linked} className="cell-fit">
        <Thumbnail url={project.get('thumbnail_url')} />
      </td>
      <td {...linked}>{project.get('name')}</td>
      <td {...linked}>{project.get('ref_number')}</td>
      <td {...linked}>{project.get('collection')}</td>
      <td {...linked} />
      <td className="smaller1">{project.getIn(['stage', 'label'])}</td>
      <td>
        <AvatarList avatars={project.get('avatar_list')} />
      </td>
      <td className="pl0 cell-fit">
        <div className="flex items-end">
          <Dropdown icon="more">
            <Link to={url}>Manage</Link>
            <button onClick={() => fileProject({ id, archived: !archived })}>
              {archived ? 'Restore' : 'Archive'}
            </button>
            <button
              onClick={() => {
                confirm(
                  'Are you sure you want to delete this project?'
                ).then(() => {
                  deleteProject(id);
                });
              }}
            >
              Delete
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
  deleteProject: React.PropTypes.func,
};
