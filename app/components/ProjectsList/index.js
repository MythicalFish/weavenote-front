import React, { PropTypes } from 'react';
import ListItem from './ListItem';


function ProjectsList({ error, projects }) {
  if (error !== false) {
    return (
      <div>
        Something went wrong
      </div>
    );
  }
  let content = (<div></div>);
  if (projects !== false) {
    content = projects.map((project, index) => (
      <ListItem key={`project-${index}`} project={project} listIndex={index} />
    ));
  }
  return (
    <div>
      {content}
    </div>
  );
}

ProjectsList.propTypes = {
  error: PropTypes.any,
  projects: PropTypes.any,
};

export default ProjectsList;
