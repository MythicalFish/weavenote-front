import React, { PropTypes } from 'react';
import SubHeader from 'components/SubHeader';
import ListItem from './ListItem';
import Navigation from './Navigation';

function ListProjects({ projectsList, listProjects, createProject }) {
  let content = (<div></div>);
  if (projectsList !== false && projectsList !== undefined) {
    content = projectsList.map((project, index) => (
      <ListItem key={`project-${index}`} project={project} />
    ));
  }
  return (
    <div>
      <SubHeader>
        <Navigation createProject={createProject} listProjects={listProjects} />
      </SubHeader>
      <div className="p2">
        {content}
      </div>
    </div>
  );
}

ListProjects.propTypes = {
  projectsList: PropTypes.any,
  createProject: PropTypes.func,
  listProjects: PropTypes.func,
};

export default ListProjects;
