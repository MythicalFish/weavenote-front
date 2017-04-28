import React, { PropTypes } from 'react';
import SubHeader from 'components/SubHeader';
import ListItem from './ListItem';
import Navigation from './Navigation';

function ListProjects({ projectsList, listProjects }) {
  let content = (<div></div>);
  if (projectsList !== false && projectsList !== undefined) {
    content = projectsList.map((project, index) => (
      <ListItem key={`project-${index}`} project={project} />
    ));
  }
  return (
    <div>
      <SubHeader>
        <Navigation listProjects={listProjects} />
      </SubHeader>
      <div className="p2">
        {content}
      </div>
    </div>
  );
}

ListProjects.propTypes = {
  projectsList: PropTypes.any,
  listProjects: PropTypes.func,
};

export default ListProjects;
