import React from 'react';
import { Link } from 'react-router';
import Dropdown from 'components/Dropdown';
import Thumbnail from 'components/Thumbnail';

export default function ListItem(props) {
  const { project, fileProject } = props;
  const { id, archived } = project;
  const url = `/projects/${id}`;
  return (
    <div className="bb1 mb2 pb2 bg-white flex justify-between x-fill">
      <Link to={url} className="flex items-center b0 bg-white">
        <div className="pr2">
          <Thumbnail url={project.thumbnail_url} />
        </div>
        <div className="p2">
          {project.name}
        </div>
        <div className="p2">
          #{project.identifier}
        </div>
      </Link>
      <div className="flex items-center">
        <div className="p2 smaller1 upcase">
          {project.stage.label}
        </div>
        <div className="p2 dark3 smaller1">collaborators</div>
        <div className="p2">
          <Dropdown icon="MoreHorizontal">
            <Link to={url}>Manage</Link>
            <button onClick={() => fileProject({ id, archived: !archived })}>
              {archived ? 'Restore' : 'Archive'}
            </button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

ListItem.propTypes = {
  project: React.PropTypes.object.isRequired,
  fileProject: React.PropTypes.func,
};
