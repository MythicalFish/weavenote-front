import React, { PropTypes } from 'react';
import ListItem from './ListItem';

export default function List(props) {
  const { projects } = props;
  return (
    <div className="container-narrow px2 py4">
      <table>
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Reference number</th>
            <th>Season/Collection</th>
            <th>Color</th>
            <th>Members</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {projects &&
            projects.map((project, index) => (
              <ListItem key={`project-${index}`} project={project} {...props} />
            ))}
        </tbody>
      </table>
    </div>
  );
}

List.propTypes = {
  projects: PropTypes.object,
};
