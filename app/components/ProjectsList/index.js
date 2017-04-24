import React, { PropTypes } from 'react';
import ListItem from './ListItem';


function ProjectsList({ list }) {
  let content = (<div></div>);
  if (list !== false && list !== undefined) {
    content = list.map((project, index) => (
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
  list: PropTypes.any,
};

export default ProjectsList;
