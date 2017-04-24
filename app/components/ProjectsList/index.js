import React, { PropTypes } from 'react';
import ProjectListItem from 'containers/ProjectListItem';


function ProjectsList({ list }) {
  let content = (<div></div>);
  if (list !== false && list !== undefined) {
    content = list.map((project, index) => (
      <ProjectListItem key={`project-${index}`} project={project}  />
    ));
  }
  return (
    <div>
      {content}
    </div>
  );
}

ProjectsList.propTypes = {
  list: PropTypes.any,
};

export default ProjectsList;
