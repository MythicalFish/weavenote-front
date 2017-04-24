import React, { PropTypes } from 'react';
import ListItem from './ListItem';


function ProjectsList({ items }) {
  let content = (<div></div>);
  if (items !== false) {
    content = items.map((project, index) => (
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
  items: PropTypes.any,
};

export default ProjectsList;
