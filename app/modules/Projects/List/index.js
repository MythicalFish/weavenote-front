import React, { PropTypes } from 'react';
import SubHeader from 'components/SubHeader';
import ListItem from './ListItem';
import Navigation from './Navigation';

function ListProjects({ list, onClick }) {
  let content = (<div></div>);
  if (list !== false && list !== undefined) {
    content = list.map((project, index) => (
      <ListItem key={`project-${index}`} project={project} onClick={() => { onClick(project.id); }} />
    ));
  }
  return (
    <div>
      <SubHeader>
        <Navigation onChange={() => { }} />
      </SubHeader>
      <div className="p2">
        {content}
      </div>
    </div>
  );
}

ListProjects.propTypes = {
  list: PropTypes.any,
  onClick: PropTypes.func,
};

export default ListProjects;
