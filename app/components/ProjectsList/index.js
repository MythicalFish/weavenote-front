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
      //<li key={`project-${index}`}>
      <ListItem project={project} listIndex={index} />
    ));
  }
  console.log(content);
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
