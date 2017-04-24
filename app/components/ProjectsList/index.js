import React, { PropTypes } from 'react';
import ListItem from './ListItem';


function ProjectsList({ list, onClick }) {
  let content = (<div></div>);
  if (list !== false && list !== undefined) {
    content = list.map((project, index) => (
      <ListItem key={`project-${index}`} project={project} onClick={onClick} />
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
  onClick: PropTypes.func,
};

export default ProjectsList;
