import React, { PropTypes } from 'react';
import ListItem from '../ListItem';

function ProjectList({ projectsList, listProjects, createProject }) {
  let content = (<div></div>);
  if (projectsList !== false && projectsList !== undefined) {
    content = projectsList.map((project, index) => (
      <ListItem key={`project-${index}`} project={project} />
    ));
  }
  return (
    <div className="p2">
      {content}
    </div>
  );
}

ProjectList.propTypes = {
  projectsList: PropTypes.any,
  createProject: PropTypes.func,
  listProjects: PropTypes.func,
};

export default ProjectList;
