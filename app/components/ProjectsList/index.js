import React, { PropTypes } from 'react';

import List from 'components/List';

function ProjectsList({ error, projects }) {
  if (error !== false) {
    const items = [{ title: 'Something went wrong' }];
    return <List items={items} />;
  }

  if (projects !== false) {
    return <List items={projects} />;
  }

  return null;
}

ProjectsList.propTypes = {
  error: PropTypes.any,
  projects: PropTypes.any,
};

export default ProjectsList;
