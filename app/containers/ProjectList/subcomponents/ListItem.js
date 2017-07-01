import React from 'react';
import { Link } from 'react-router';
import Dropdown from 'components/Dropdown';
import Thumbnail from 'components/Thumbnail';

export default function ListItem(props) {
  const { project, fileProject } = props;
  const url = `/projects/${project.id}`;
  return (
    <div className="b1 mb2 bg-white dark7 flex justify-between x-fill">
      <Link to={url} className="flex items-center b0 bg-white">
        <div className="p1 pr2">
          <Thumbnail url={project.thumbnail_url} />
        </div>
        <div className="p2">
          <div>{project.name}</div>
        </div>
        <div className="p2">
          <div>#{project.identifier}</div>
        </div>
      </Link>
      <div className="flex items-center">
        <div className="p2 smaller1 upcase">
          {project.stage.label}
        </div>
        <div className="p2 dark3 smaller1">
          collaborators
        </div>
        <div className="p2">
          <Dropdown label="...">
            <Link to={url}>Manage</Link>
            {!project.archived && <button onClick={() => { fileProject({ id: project.id, archived: true }); }}>Archive</button>}
            {project.archived && <button onClick={() => { fileProject({ id: project.id, archived: false }); }}>Restore</button>}
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
